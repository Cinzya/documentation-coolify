---
title: Coolify Instance settings
description: Configure instance-wide Coolify settings such as URL, registration, API access, updates, backup, email, OAuth, and scheduled job monitoring.
---

# Instance settings
Instance settings let you configure instance-wide behavior for your Coolify installation.

This guide is for **self-hosted** users who want to manage their Coolify instance.

If you use **Coolify Cloud**, these instance settings are managed by the Coolify team and are not user-editable.

To access instance settings:
- click **Settings** from the left sidebar, or
- visit `https://your-coolify-domain.com/settings`

<ZoomableImage src="shadow-to-do" alt="Coolify settings" />

The Settings area has five main tabs:
| Item | Description |
| :--- | :--- |
| [Configuration](#configuration) | Core instance settings (General, Advanced, Updates). |
| [Backup](#backup) | Backup setup and backup history for the instance. |
| [Transaction Email](#transaction-email) | Instance-wide transactional email provider settings. |
| [OAuth](#oauth) | External login provider settings for the instance. |
| [Scheduled Jobs](#scheduled-jobs) | Monitor scheduler health, failures, and skipped jobs. |


## Configuration
The Configuration tab has three sections:
| Item | Description |
| :--- | :--- |
| [General](#general) | URL, name, timezone, and public IP settings. |
| [Advanced](#advanced) | Registration, telemetry, DNS/API, and confirmation options. |
| [Updates](#updates) | Update check schedule and automatic update behavior. |

<ZoomableImage src="shadow-to-do" alt="Coolify settings" />

### General
The General section includes:
| Item | Description |
| :--- | :--- |
| [URL](#url) | Dashboard URL used to access your Coolify instance. |
| [Name](#name) | Custom label shown in UI contexts like browser tab/title. |
| [Instance Timezone](#instance-timezone) | Timezone used for instance-level schedules. |
| [Instance Public IPv4 / IPv6](#instance-public-ipv4--ipv6) | Public IP values for the server running Coolify. |

<ZoomableImage src="shadow-to-do" alt="Coolify settings" />

---

#### URL
This is the dashboard URL of your Coolify instance.

If you want to access the dashboard over HTTPS, enter the URL with `https://` (example: `https://coolify.shadowarcanist.com`).

For this to work correctly:
- point your DNS record to the public IP of the server where Coolify is running
- make sure the Coolify proxy is running 

::: tip Tip
To check if Coolify proxy is running: go to the sidebar, click on `Servers`, select your server and you will see "Start Proxy" button on top right if it's not running
:::

::: info Note
Paths are not supported. Example: `https://shadowarcanist.com/coolify` will not work.

Use a root domain or subdomain, for example: `https://coolify.shadowarcanist.com`.
:::

---

#### Name
Custom label for your Coolify instance.

Shown in UI context like browser tab/title display, and useful when you manage multiple instances.

---

#### Instance Timezone
Timezone used for instance-level scheduled jobs.

This affects schedules such as update checks and automatic updates. 

It also applies to other instance-level maintenance jobs, such as service template checks, changelog downloads, coolify-helper image checks, Traefik version checks, and global server connection checks.

Defaults to `UTC`.

::: info Note
Instance Timezone does not control per-server schedules like backups and scheduled tasks. Those use each server's **Server Timezone** setting.
:::

---

#### Instance Public IPv4 / IPv6
Public IP values for the server where Coolify is running.

Coolify auto-detects these values. If detection is wrong (for example on multi-IP servers), you can set them manually.

---

### Advanced
The Advanced section includes:
| Item | Description |
| :--- | :--- |
| [Registration](#registration) | Control whether users can self-register. |
| [Telemetry](#telemetry) | Control anonymous installation telemetry reporting. |
| [DNS Settings](#dns-settings) | DNS validation and custom DNS resolver configuration. |
| [API Settings](#api-settings) | API enablement and IP allowlist settings. |
| [UI Settings](#ui-settings) | Dashboard navigation behavior settings. |
| [Confirmation Settings](#confirmation-settings) | Destructive confirmation and sponsorship popup settings. |

<ZoomableImage src="shadow-to-do" alt="Coolify settings" />

---

#### Registration
`Registration Allowed` controls whether new users can self-register on your instance.

By default, Coolify disables registration after the first admin account is created.

This is a security default so random users cannot create accounts on your instance.

Enable this only when you intentionally want other people to create accounts from the login/register page.

---

#### Telemetry
`Do Not Track` controls anonymous telemetry reporting for self-hosted instances.

When `Do Not Track` is **disabled**, Coolify sends an alive signal to `undead.coolify.io` with: `appId` and `version`.

If you enable `Do Not Track`, this alive signal is not sent.

This signal is used for self-hosted installation counting shown on [coolify.io](https://coolify.io/).

::: info Note
Your IP address is not stored. Only the `appId` and `version` of your Coolify instance are sent.

Other than `appId` and `version`, nothing else is sent to the Coolify team.
:::

---

#### DNS Settings
`DNS Validation` makes Coolify verify DNS records before accepting custom domains in resource domain fields.

This helps catch mistakes early (for example, domain that doesn't have A record) before deployment/routing issues happen.

You can also define custom DNS resolvers in `Custom DNS Servers` as comma-separated values (example: `1.1.1.1,8.8.8.8`). If this field is empty, Coolify uses system default resolvers.

::: info Note
This option can increase the save time for application since it has to perform DNS checks in the background.

If Coolify takes over 10 seconds to save application configuration changes, disable this option.
:::

---

#### API Settings
`API Access` controls whether authenticated API requests are allowed.

You can additionally restrict API access by IP using `Allowed IPs for API Access`.

This is useful when you only want specific office/server networks to access the API.

Supported formats:
- single IP (for example: `192.168.1.10`)
- CIDR ranges (for example: `192.168.1.0/24`)
- comma-separated combinations (for example: `192.168.1.0/24,10.0.0.0/24`)

`0.0.0.0` (or an empty value) allows API access from anywhere.

---

#### UI Settings
`SPA Navigation` changes how the dashboard navigates between pages.

When enabled:
- page transitions are smoother
- many navigation actions happen without full page reload
- linked pages can be prefetched to feel faster

::: info Note
If you notice navigation glitches or dashboard performance issues, you can disable SPA Navigation and use classic full page reload behavior.
:::

---

#### Confirmation Settings
You can configure two confirmation-related options:

**A. Disable Two Step Confirmation**:
- by default, destructive actions require confirmation text and password
- enabling this option removes that extra confirmation layer

**B. Show Sponsorship Popup**:
- controls the monthly sponsorship banner shown in the dashboard
- disable it if you do not want to see sponsorship reminders in the dashboard

---

### Updates
The Updates section controls:
- [Update check frequency](#update-check-frequency)
- [Automatic update behavior](#automatic-updates)

<ZoomableImage src="shadow-to-do" alt="Coolify settings" />

---

#### Update Check Frequency
Coolify checks [CDN](https://cdn.coolify.io/versions.json) for new Coolify versions.

You can configure how often Coolify has to check for new versions using cron expression or human aliases like: `every_minute`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`.

Defaults to `hourly`.

---

#### Automatic updates
Enable `Auto Update` if you want Coolify to update itself automatically.

You can set Auto update frequency using cron expression or human aliases like: `every_minute`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`.

Defaults to `daily`.

::: info Note
If `AUTOUPDATE` is defined in your `/data/coolify/source/.env` file, that value overrides the value you set on UI.
:::


## Backup
The Backup tab is for instance-level backups of the internal `coolify-db` database.

<ZoomableImage src="shadow-to-do" alt="Coolify backup settings" />

From this tab, you can:
- configure scheduled backup settings
- configure optional S3 target
- review backup execution history

For detailed backup setup, see [Instance Backup](shadow-to-do).

## Transaction Email
The Transaction Email tab configures instance-wide transactional emails (for example password reset and invitations).

<ZoomableImage src="shadow-to-do" alt="Coolify transactional email settings" />

You can use either:
- SMTP, or
- Resend

::: info Note
Only one provider can be active at a time in this settings flow.

Enabling SMTP disables Resend, and enabling Resend disables SMTP.
:::

---

### SMTP
To use SMTP for email sending, configure these fields:

| Item | Description |
| :--- | :--- |
| Host | SMTP server hostname. |
| Port | SMTP server port. |
| Encryption | Value can be one of: `StartTLS`, `TLS/SSL`, or `none`. |
| SMTP Username | SMTP authentication username (if required). |
| SMTP Password | SMTP authentication password (if required). |
| Timeout | Email send timeout value. |

When using SMTP, keep your `From` email domain aligned with your SMTP mail domain setup. Example: if SMTP host is `coolify.shadowarcanist.com`, use a matching sender like `mails@coolify.shadowarcanist.com`.

---

### Resend
To use Resend for email sending, add your Resend API key in Coolify.

You can create a key by following [Create Resend API Key](https://resend.com/docs/dashboard/api-keys/introduction#add-api-key).

When using Resend, your `From` email domain must be verified/managed in Resend. Example: if your Resend domain is `coolify.shadowarcanist.com`, use a sender like `mails@coolify.shadowarcanist.com`.

---

::: tip Tip
Sometimes emails will land on Spam or Junk folder, so make sure to check those folders for emails from Coolify.
:::

## OAuth
The OAuth tab configures external login providers.

<ZoomableImage src="shadow-to-do" alt="Coolify OAuth settings" />

For each provider, you can set:
- client ID
- client secret
- redirect URI
- optional provider-specific fields (such as tenant/base URL)

For detailed OAuth setup, see [OAuth](shadow-to-do).

## Scheduled Jobs
The Scheduled Jobs tab is an operational troubleshooting view.

<ZoomableImage src="shadow-to-do" alt="Coolify scheduled jobs settings" />

It focuses on scheduler issues and health, including:
- failed scheduled executions
- skipped jobs and skip reasons
- scheduler run history

Use this tab when you need to debug if scheduled operations are failing or not being dispatched.
