---
title: Downgrade Coolify
description: Downgrade a self-hosted Coolify instance to a previous version using terminal commands and rollback safety checks.
---

# Downgrade Coolify
Downgrading Coolify moves your self-hosted control plane back to an older version.

This guide is for **self-hosted** users who need rollback control (for example, after update regressions).

If you use **Coolify Cloud**, Coolify instance versions are managed by the Coolify team.
Cloud users cannot manually downgrade Coolify.

## Before you downgrade
Use this checklist first:
- take a backup of your Coolify database
- take a backup of `/data/coolify/source/.env`
- review [release notes](https://github.com/coollabsio/coolify/releases) and confirm the target version

Backup guide:
- [Back up your Coolify instance](shadow-to-do)

::: warning Backup first
Always create a backup before downgrading. Downgrades can introduce compatibility issues that may require restore.

The file `/data/coolify/source/.env` contains the Coolify database password and the encryption key used to encrypt the database. Without this `.env` file, you will not be able to restore backups for your Coolify instance.
:::


## Downgrade process
Use this process in order:
- [Disable automatic updates](#1-disable-automatic-updates)
- [Run terminal downgrade command](#2-run-terminal-downgrade-command)
- [Verify downgrade success](#3-verify-downgrade-success)

---

### 1. Disable automatic updates
Disable automatic updates first, so Coolify does not auto-upgrade again right after the downgrade.

#### How to do this?
1. Open the Coolify dashboard.
2. Go to **Settings**.
3. Disable automatic updates.
4. Save settings.

<ZoomableImage src="shadow-to-do" alt="Disable automatic updates in Coolify settings" />

---

### 2. Run terminal downgrade command
Downgrade is done by running the install script with a specific older version.

#### How to do this?
1. SSH into the server where Coolify is running.
2. Run the downgrade command with the target version.
3. Wait until the script finishes.

Downgrade to a specific version:

```sh
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash -s 4.0.0-beta.369
```

Replace `4.0.0-beta.369` with the version you want.

---

### 3. Verify downgrade success
After the command completes:
1. Open the Coolify dashboard.
2. Confirm the expected version is shown on top left corner.


## Downgrade risks
### 1. Database schema compatibility
Newer versions may apply schema changes that older versions do not fully support.

### 2. Feature compatibility
Some features/config values created in newer versions may not work correctly in older versions.


## Common downgrade issues
### 1. Coolify upgrades again after downgrade
Check if automatic updates are disabled on Coolify dashboard


### 2. Dashboard is unreachable after downgrade
Check if Coolify containers (`coolify`, `coolify-db`, `coolify-redis`, `coolify-realtime`, `coolify-proxy`) are running and healthy on the server.

If all Coolify containers are healthy, make sure port `8000` is open on your firewall, then visit `http://203.0.113.1:8000` in your browser (replace `203.0.113.1` with your actual server IP address).

### 3. Target version causes broken behavior
Choose a different target version and repeat the downgrade process, or upgrade back to your previous version and restore from backup (if needed).
