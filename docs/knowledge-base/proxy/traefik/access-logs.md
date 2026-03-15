---
title: "Access Logs"
description: "Enable and configure Traefik access logs in Coolify for monitoring, security tools like CrowdSec and Fail2Ban, and analytics with GoAccess."
---

# Access Logs

Traefik can log every incoming HTTP request, which is useful for monitoring traffic, debugging issues, and integrating with security tools like [CrowdSec](https://www.crowdsec.net/?utm_source=coolify.io) or [Fail2Ban](https://github.com/fail2ban/fail2ban?utm_source=coolify.io).

By default, access logging is disabled in Traefik. You can enable it by adding command flags to the proxy configuration in Coolify.

## Enabling Access Logs

1. Go to **Servers > your server > Proxy**.
2. Add the following flag to the Traefik command configuration:

```yaml
- '--accesslog=true'
```

3. Restart the proxy.

After restarting, you can view access logs at **Servers > your server > Proxy > Logs**.

## Using JSON Format

For structured logging that is easier to parse with external tools, use JSON format:

```yaml
- '--accesslog=true'
- '--accesslog.format=json'
```

This is recommended if you plan to feed the logs into analytics or security tools.

## Filtering Fields

Access logs can be verbose. You can reduce noise by dropping unnecessary fields and keeping only what you need.

Set the default mode to `drop` and explicitly keep specific fields:

```yaml
- '--accesslog=true'
- '--accesslog.format=json'
- '--accesslog.fields.defaultmode=drop'
- '--accesslog.fields.names.ClientHost=keep'
- '--accesslog.fields.names.DownstreamContentSize=keep'
- '--accesslog.fields.names.DownstreamStatus=keep'
- '--accesslog.fields.names.Duration=keep'
- '--accesslog.fields.names.RequestHost=keep'
- '--accesslog.fields.names.RequestMethod=keep'
- '--accesslog.fields.names.RequestPath=keep'
```

### Keeping Headers

You can also selectively keep request headers:

```yaml
- '--accesslog.fields.headers.defaultmode=drop'
- '--accesslog.fields.headers.names.User-Agent=keep'
- '--accesslog.fields.headers.names.Referer=keep'
```

If you are behind Cloudflare, you may want to keep Cloudflare-specific headers as well:

```yaml
- '--accesslog.fields.headers.names.Cf-Connecting-Ip=keep'
- '--accesslog.fields.headers.names.Cf-Ipcountry=keep'
- '--accesslog.fields.headers.names.Cf-Ray=keep'
```

## Full Example

Here is a complete example combining all the options above:

```yaml
- '--accesslog=true'
- '--accesslog.format=json'
- '--accesslog.fields.defaultmode=drop'
- '--accesslog.fields.names.ClientHost=keep'
- '--accesslog.fields.names.DownstreamContentSize=keep'
- '--accesslog.fields.names.DownstreamStatus=keep'
- '--accesslog.fields.names.Duration=keep'
- '--accesslog.fields.names.RequestHost=keep'
- '--accesslog.fields.names.RequestMethod=keep'
- '--accesslog.fields.names.RequestPath=keep'
- '--accesslog.fields.headers.defaultmode=drop'
- '--accesslog.fields.headers.names.User-Agent=keep'
- '--accesslog.fields.headers.names.Referer=keep'
- '--accesslog.fields.headers.names.Cf-Connecting-Ip=keep'
- '--accesslog.fields.headers.names.Cf-Ipcountry=keep'
- '--accesslog.fields.headers.names.Cf-Ray=keep'
```

## Writing Logs to a File

By default, access logs are written to stdout (visible in the Coolify proxy logs viewer). If you need logs written to a file on the host — for example, to feed them into Fail2Ban or CrowdSec running on the host — you can configure a file path and mount a volume.

### 1. Set the log file path

Add the `filepath` flag to the Traefik command configuration:

```yaml
- '--accesslog=true'
- '--accesslog.filepath=/var/log/traefik/access.log'
```

### 2. Mount a volume

You also need to mount a host directory into the Traefik container so the log file is accessible on your server. Add a volume to the proxy configuration in Coolify's Docker Compose or through the Coolify UI:

```yaml
volumes:
  - /var/log/traefik:/var/log/traefik
```

After restarting the proxy, access logs will be written to `/var/log/traefik/access.log` on your server.

### 3. Set up log rotation

Since Traefik does not rotate log files on its own, you should configure `logrotate` on the host to prevent the log file from growing indefinitely.

Create a logrotate configuration file at `/etc/logrotate.d/traefik`:

```
/var/log/traefik/access.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    copytruncate
}
```

This rotates the log daily, keeps 14 days of history, and compresses old files.

::: warning
When using `copytruncate`, there is a small window where log entries may be lost during rotation. This is generally acceptable for access logs. Alternatively, you can send a `USR1` signal to Traefik to reopen the log file after rotation, but `copytruncate` is simpler to set up.
:::

## Use Cases

- **[CrowdSec](https://www.crowdsec.net/?utm_source=coolify.io)** — Analyze access logs to detect and block malicious traffic patterns.
- **[Fail2Ban](https://github.com/fail2ban/fail2ban?utm_source=coolify.io)** — Ban IPs based on suspicious request patterns in the logs.
- **[GoAccess](https://goaccess.io/?utm_source=coolify.io)** — Generate real-time web analytics dashboards from access logs.

::: tip
When writing to stdout (the default), Docker's logging driver handles log storage and rotation automatically. When writing to a file, set up `logrotate` as described in the [file logging section](#writing-logs-to-a-file) above.
:::

For more details, see the [official Traefik access logs documentation](https://doc.traefik.io/traefik/observability/access-logs/?utm_source=coolify.io).
