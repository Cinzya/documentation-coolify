---
title: Update Coolify
description: Update a self-hosted Coolify instance using automatic updates, dashboard-triggered updates, or terminal commands.
---

# Update Coolify
Updating Coolify keeps your self-hosted control plane on the latest stable improvements and fixes.

This guide is for **self-hosted** users who want a clear update path with the right level of control.

If you use **Coolify Cloud**, the Coolify team fully manages Coolify instance updates for you.
You do not need to update Coolify manually or plan update operations for the Coolify instance.

Cloud updates are rolled out by the team after validating that the release is stable.
Because of that validation process, Cloud can receive updates slightly later than self-hosted.

## Before you update
Use this checklist first:
- take a backup of your Coolify database
- take a backup of `/data/coolify/source/.env`
- review [release notes](https://github.com/coollabsio/coolify/releases)

Backup guide:
- [Back up your Coolify instance](shadow-to-do)

::: warning Backup first
Always create a backup before updating. If anything goes wrong, backup is your fastest recovery path.

The file `/data/coolify/source/.env` contains the Coolify database password and the encryption key used to encrypt the database. Without this `.env` file, you will not be able to restore backups for your Coolify instance.
:::


## Update methods
You can update Coolify in three ways.
- [Automatic updates](#_1-automatic-updates)
- [Dashboard-triggered updates](#_2-dashboard-triggered-updates)
- [Terminal update (manual)](#_3-terminal-update-manual)

---

### 1. Automatic updates
Use this if you want a hands-off update flow.

#### How it works:
- Coolify periodically checks the [CDN](https://cdn.coolify.io/versions.json) for new versions
- when a newer version is available, Coolify updates itself automatically

#### Use this when:
- you want to stay current with minimal manual work
- you are comfortable with updates being applied automatically

#### How to do this?
1. Open the Coolify dashboard.
2. Go to **Settings**.
3. Make sure automatic updates are enabled.
4. Save settings if you changed anything.

<ZoomableImage src="shadow-to-do" alt="Automatic update settings in Coolify" />

---

### 2. Dashboard-triggered updates
Use this if you want control over **when** the update runs.

#### How it works:
- Coolify periodically checks the [CDN](https://cdn.coolify.io/versions.json) for new versions
- when an update is available, you will see an **Upgrade** option in the dashboard
- you trigger the update when you are ready

#### Use this when:
- you prefer scheduled/manual timing
- you want to review changes before applying them

#### How to do this?
1. Open the Coolify dashboard.
2. Wait until an update is available.
3. Click the **Upgrade** action in the sidebar.
4. Wait for the update process to finish.
5. Refresh the dashboard and confirm the new version is active by checking the version number in the top-left corner.

<ZoomableImage src="shadow-to-do" alt="Upgrade action in Coolify sidebar" />

---

### 3. Terminal update (manual)
Use this when you want full control or need version pinning.

#### How to do this?
1. SSH into the server where Coolify is running.
2. Run the latest-version command or the specific-version command (check below).
3. Wait until the script finishes.
4. Open the dashboard and verify everything is healthy.


Update to the latest available version:

```sh
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

Update to a specific version:

```sh
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash -s 4.0.0-beta.400
```

Replace `4.0.0-beta.400` with the version you want.


## Verify update success
After updating:
- open the Coolify dashboard
- confirm the instance is reachable and healthy
- check your resources are still running as expected


## Common update issues
### 1. Update appears stuck on UI
Sometimes the UI gets stuck after stage 3 (`Image`). Wait up to 3 minutes. If nothing changes, refresh the page.

In many cases, this happens because the UI temporarily loses state while Coolify containers are restarted during the update.

### 2. Dashboard is unreachable after update
Check if Coolify containers (`coolify`, `coolify-db`, `coolify-redis`, `coolify-realtime`, `coolify-proxy`) are running and healthy on the server.

If all Coolify containers are healthy, make sure port `8000` is open on your firewall, then visit `http://203.0.113.1:8000` in your browser (replace `203.0.113.1` with your actual server IP address).
