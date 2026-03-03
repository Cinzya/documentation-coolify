# Security Review: PR #8734 — Container File Browser

**PR**: [coollabsio/coolify#8734](https://github.com/coollabsio/coolify/pull/8734)
**Author**: Deducer
**Scope**: +932 lines across 7 files — adds a web-based file browser for Docker containers
**Review Date**: 2026-03-03

---

## Overview

This PR adds a Livewire component that allows browsing, uploading, downloading, creating, and deleting files inside running Docker containers. It is gated behind the existing `can.access.terminal` middleware. The implementation shows security awareness (input validation, `escapeshellarg`, regex checks), but has several issues ranging from a critical shell quoting bug to defense-in-depth gaps.

### Files Changed

| File | Status |
|------|--------|
| `app/Livewire/Project/Shared/FileBrowser.php` | Added (550 lines) |
| `resources/views/livewire/project/shared/file-browser.blade.php` | Added (194 lines) |
| `resources/views/livewire/project/application/heading.blade.php` | Modified |
| `resources/views/livewire/project/database/heading.blade.php` | Modified |
| `resources/views/livewire/project/service/heading.blade.php` | Modified |
| `routes/web.php` | Modified |
| `tests/Unit/Livewire/FileBrowserTest.php` | Added (172 lines) |

---

## CRITICAL: Shell Quoting Bug in `downloadFile()` and `downloadFolder()`

**File**: `FileBrowser.php`

```php
$escapedPath = escapeshellarg($filePath);
// ...
"docker exec {$escapedContainer} sh -c 'base64 {$escapedPath}'"
```

`escapeshellarg()` wraps its argument in single quotes (e.g., `'/var/log/file.txt'`). Placing this **inside** another single-quoted `sh -c '...'` string breaks quoting. The resulting command:

```
docker exec 'mycontainer' sh -c 'base64 '/var/log/file.txt''
```

The shell parses this as `sh -c "base64 "` (the first quoted segment), with `/var/log/file.txt` as an unquoted `$0` argument — meaning `base64` runs with **no file argument**. This is:

1. **A functionality bug** — downloads will fail or return unexpected results
2. **A potential security issue** — the unquoted path segment is subject to word splitting and glob expansion by the shell

**Same issue in `downloadFolder()`**:

```php
"docker exec {$escapedContainer} sh -c 'tar czf - -C "
    .escapeshellarg(dirname($folderPath)).' '.escapeshellarg($name)
    ." | base64'"
```

**Fix**: Either avoid `sh -c` wrapping (use `docker exec` directly), or escape the entire `sh -c` argument as one unit:

```php
// Option A: No sh -c needed for base64
"docker exec {$escapedContainer} base64 {$escapedPath}"

// Option B: Escape the whole inner command
$innerCmd = escapeshellarg("base64 " . $filePath);
"docker exec {$escapedContainer} sh -c {$innerCmd}"
```

---

## HIGH: Missing `validatePath()` on Constructed Paths

The `browse()` method correctly calls `validatePath($path)` before executing commands. However, **five other methods** construct paths from `currentPath` + entry name without re-validating the final path:

| Method | Path Construction | Validates? |
|--------|------------------|-----------|
| `deleteEntry()` | `currentPath + '/' + $name` | No |
| `downloadFile()` | `currentPath + '/' + $name` | No |
| `downloadFolder()` | `currentPath + '/' + $name` | No |
| `createFolder()` | `currentPath + '/' + $newFolderName` | No |
| `uploadToContainer()` | `currentPath + '/' + $originalName` | No |

While Livewire v3's snapshot checksum protects `currentPath` and `entries` from client-side tampering, this is a **defense-in-depth failure**. If a future code change introduces a way to set `currentPath` without validation, or if the Livewire checksum is ever bypassed, these methods become exploitable for path traversal.

**Recommendation**: Call `validatePath()` on every constructed path before use, or extract a helper:

```php
private function buildAndValidatePath(string $base, string $name): ?string
{
    $path = rtrim($base, '/') . '/' . $name;
    if (!$this->validatePath($path)) {
        $this->dispatch('error', 'Invalid path.');
        return null;
    }
    return $path;
}
```

---

## HIGH: Memory Exhaustion via File Downloads

```php
$content = instant_remote_process([
    "docker exec {$escapedContainer} sh -c 'base64 {$escapedPath}'",
], $resolved['server']);

$decoded = base64_decode(str_replace("\n", '', $content));

return response()->streamDownload(function () use ($decoded) {
    echo $decoded;
}, $name);
```

Despite the 100MB size check via `stat`, the process:

1. Loads the **entire base64-encoded** content into a PHP string (~133% of file size)
2. Calls `str_replace` on it (creates another copy)
3. Calls `base64_decode` (creates a third copy — the decoded content)
4. Passes `$decoded` to the closure (held in memory until streaming completes)

For a 100MB file, this means ~400MB+ of PHP memory usage. With the default `memory_limit` of 128MB or 256MB, this will crash. The `streamDownload` wrapper is misleading — the data is already fully in memory.

**Recommendation**: Either significantly lower `MAX_DOWNLOAD_SIZE` (e.g., 10-20MB), or use `docker cp` + temporary file + true streaming, similar to how upload works.

---

## MEDIUM: Error Message Information Leakage

Multiple methods pass raw exception messages to the client:

```php
$this->dispatch('error', 'Failed to browse: '.$e->getMessage());
$this->dispatch('error', 'Failed to delete: '.$e->getMessage());
$this->dispatch('error', 'Failed to upload: '.$e->getMessage());
```

Docker daemon and SSH errors can contain internal IP addresses, hostnames, file system paths on the host, Docker socket information, and SSH connection details.

**Recommendation**: Log the full exception server-side, return a generic error to the client:

```php
report($e);
$this->dispatch('error', 'Failed to browse directory.');
```

---

## MEDIUM: No Audit Logging for Destructive Operations

The `deleteEntry()` method executes `rm -rf` inside containers with no server-side audit trail:

```php
"docker exec {$escapedContainer} rm -rf {$escapedPath}"
```

There is only a client-side `confirm()` dialog, which provides no security guarantee. Similarly, file uploads and folder creation have no logging.

**Recommendation**: Add logging for all write/delete operations using the existing activity logging system.

---

## MEDIUM: TOCTOU with Array-Index File References

Methods like `deleteEntry(int $index)`, `downloadFile(int $index)`, and `navigateTo(int $index)` use array indices to reference files. If the directory contents change between when the listing was fetched and when the user clicks an action (e.g., another user or process modifies the directory), the index could point to a **different file** than intended.

This is a Time-of-Check-Time-of-Use (TOCTOU) issue — the user sees "delete config.yaml" but by the time the click arrives, index 3 might now be "database.sqlite".

**Recommendation**: Use the file name as the identifier rather than the array index.

---

## LOW: Overly Broad `..` Check in `validatePath()`

```php
if (str_contains($path, '..')) {
    return false;
}
```

This rejects **any** path containing `..` anywhere, including legitimate filenames like `/tmp/backup..2024.tar` or `/data/file..old`. The test suite confirms this: `/path/..hidden` is rejected.

**Recommendation**: Check specifically for directory traversal patterns:

```php
if (preg_match('#(^|/)\.\.(/|$)#', $path)) {
    return false;
}
```

---

## LOW: Temporary File Cleanup with Error Suppression

```php
@unlink($fullLocalPath);
@rmdir(dirname($fullLocalPath));
```

The `@` error suppression operator hides failures. If temp files are not cleaned up (e.g., permission issues), they will accumulate on the server with no visibility.

---

## LOW: `validatePath` Does Not Block Newlines

The path validation blocks null bytes and shell metacharacters but does not check for newline characters (`\n`, `\r`). While `escapeshellarg` handles this, newlines in paths could cause issues in log parsing or `ls` output parsing.

---

## Positive Security Aspects

The PR does several things well:

- Routes are protected with `can.access.terminal` middleware (same privilege as terminal access)
- `escapeshellarg()` is used consistently for shell command construction
- Container names are validated against a strict regex (`/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/`)
- Folder names and upload filenames are restricted to safe characters
- File size limits are enforced before download
- Server state is checked (`isFunctional()`, `isForceDisabled()`) before operations
- Container name is looked up from the server-side collection, not taken directly from user input
- Tests cover path validation and output parsing edge cases

---

## Summary

| Severity | Issue | Impact |
|----------|-------|--------|
| **Critical** | Shell quoting bug in `sh -c` commands | Downloads broken; potential shell interpretation of unquoted path |
| **High** | Missing `validatePath()` on 5 methods | Defense-in-depth gap for path traversal |
| **High** | Memory exhaustion on large downloads | PHP OOM crash, potential DoS |
| **Medium** | Exception messages leaked to client | Internal infrastructure exposure |
| **Medium** | No audit logging for destructive ops | No accountability for file deletion |
| **Medium** | TOCTOU with array-index file references | Wrong file deleted/downloaded |
| **Low** | Overly broad `..` check | Legitimate filenames rejected |
| **Low** | Silent temp file cleanup failures | Disk space leak |
| **Low** | Newlines not blocked in paths | Edge case parsing issues |

**Recommendation**: Address at minimum the **Critical** and **High** items before merge.
