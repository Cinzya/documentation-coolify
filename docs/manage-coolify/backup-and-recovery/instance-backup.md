---
title: Coolify Instance backup
description: Configure instance backups for the Coolify database, download backup files, and keep the required `.env` file for restore.
---

# Instance backup
Instance backup lets you backup the Coolify database for your Coolify instance.

::: info Note
This guide is for **self-hosted** users who want to setup and manage backups of their Coolify instance.

If you use **Coolify Cloud**, instance backup for the Coolify control plane is managed by the Coolify team and is not user-configurable.
:::

To access instance backup:
- click **Settings** from the left sidebar, then open **Backup**
- visit `https://your-coolify-domain.com/settings/backup`

<ZoomableImage src="shadow-to-do" alt="Coolify instance backup settings" />

The Backup tab has two main areas:
| Item | Description |
| :--- | :--- |
| [Scheduled Backup](#scheduled-backup) | Configure automatic backup behavior for the `coolify-db` database. |
| [Executions](#executions) | Review backup history, file locations, availability, and cleanup actions. |

## Before you start
If the Backup tab says instance backup is disabled, validate the **localhost** server (where Coolify is running) first.

If you see **Configure Backup**, click it once to create the instance backup configuration.

Default frequency is `0 0 * * *` (every day at `00:00`)

::: warning Important
Keep both:
- the database backup file
- `/data/coolify/source/.env`

Without `/data/coolify/source/.env`, restore will fail even if you still have the database backup file. The `.env` file contains the key used to encrypt the databse.
:::


## Backup from dashboard
Use the Backup tab if the Coolify dashboard is available, otherwise follow the [Backup from terminal guide](#backup-from-terminal)

### Create a backup now
Use this when you want to create a backup immediately.

1. Visit `https://your-coolify-domain.com/settings/backup`
2. Click **Backup Now**
2. Wait for the new backup entry to appear in **Executions**
3. Download the backup file or copy the value from `Location`

::: tip Tip
If `S3 Enabled` is active, `Backup Now` also uploads the backup to the selected S3 storage.
:::

### Scheduled Backup settings
The Scheduled Backup page includes:
| Item | Description |
| :--- | :--- |
| [Backup Enabled](#backup-enabled) | Enable or pause scheduled instance backups. |
| [S3 Enabled](#s3-enabled) | Store an additional backup copy in validated S3 storage. |
| [Disable Local Backup](#disable-local-backup) | Delete the local file immediately after successful S3 upload. |
| [Backup Now](#backup-now) | Queue an on-demand backup immediately. |
| [Frequency](#frequency) | Schedule expression for automatic backups. |
| [Timezone](#timezone) | Read-only timezone used to evaluate the schedule. |
| [Timeout](#timeout) | Maximum runtime for one backup job. |
| [Backup Retention Settings](#backup-retention-settings) | Cleanup rules for local and optional S3 backups. |

<ZoomableImage src="shadow-to-do" alt="Coolify scheduled instance backup settings" />

---

#### Backup Enabled
`Backup Enabled` controls whether the scheduled instance backup runs automatically.

If you disable it, existing backup files and execution history are not removed.

Only future scheduled runs stop.

---

#### S3 Enabled
`S3 Enabled` stores an additional copy of each successful backup in validated S3 storage.

When enabled, you must select an `S3 Storage` target.

If no validated S3 storage exists, this option is disabled.

---

#### Disable Local Backup
`Disable Local Backup` deletes the local backup file immediately after a successful S3 upload.

This option requires `S3 Enabled`.

Use this when you want S3 to be the only backup location.

::: info Note
The dashboard `Download` action reads the backup file from local storage.

If local backup is disabled, download it from your S3 storage instead.
:::

---

#### Backup Now
`Backup Now` queues an on-demand backup immediately.

This button is available when `coolify-db` is running.

After you click it, the new execution usually appears in the execution history within a few minutes.

::: tip Tip
If `S3 Enabled` is active, `Backup Now` also uploads the backup to the selected S3 storage.
:::

---

#### Frequency
`Frequency` controls how often Coolify creates an automatic instance backup.

Use a cron expression such as `0 0 * * *`.

Default is `0 0 * * *` (daily at `00:00`).

---

#### Timezone
`Timezone` is a read-only field in this page.

Instance backup follows the **Server Timezone** of the localhost server (where Coolify is running).

---

#### Timeout
`Timeout` controls how long one backup job is allowed to run before timing out.

This value is in seconds.

Default is `3600`.

---

#### Backup Retention Settings
Backup retention is configured separately for:
- local storage
- S3 storage

Each location has three limits:
- number of backups to keep
- number of days to keep backups
- maximum storage in GB

Rules to know:
- setting a value to `0` means unlimited retention for that rule
- the rules work independently
- whichever rule is reached first triggers cleanup
- cleanup removes older successful backups first

---

### Executions
The Executions area shows the backup history for the Coolify database.

<ZoomableImage src="shadow-to-do" alt="Coolify instance backup executions" />

Each execution shows:
- status
- run time
- file size
- backup location
- availability in local storage and S3

For successful executions, Coolify shows a `Download` action.

This downloads the local backup file from the server.

You can also delete a single execution from this area.

If the backup still exists in S3, the delete flow can optionally remove the S3 copy too.

The execution list also includes two cleanup tools:

**A. Cleanup Failed Backups**
- removes failed execution entries from history

**B. Cleanup Deleted**
- removes execution entries already marked as deleted from local storage
- does **not** delete the actual backup files

---

### Backup file location
Use the `Location` value from **Executions**.

For Local and S3, backup files are stored under: `/data/coolify/backups/coolify/coolify-db-hostdockerinternal/`

Files are created with names like: `pg-dump-coolify-1713700000.dmp`


### Copy the `.env` file
After you download or save the backup file path, also copy `/data/coolify/source/.env`.

Run:

```sh
cp /data/coolify/source/.env /data/backups/coolify-source.env
```

This creates a copy at: `/data/backups/coolify-source.env`

### Back up SSH keys
If you may restore this backup on another server later, also back up the Coolify SSH keys.

Run:

```sh
mkdir -p /data/backups/coolify-ssh-keys
cp -R /data/coolify/ssh/keys/. /data/backups/coolify-ssh-keys/
```

This creates `/data/backups/coolify-ssh-keys/`

These files help the restored instance reconnect to servers managed by Coolify.

---

## Backup from terminal
Use this if the dashboard is unavailable.

### 1. Create the database backup
::: info Note
The `coolify-db` container must be running before you run the backup command.
:::

Run:

```sh
source /data/coolify/source/.env
mkdir -p /data/coolify/backups/coolify/manual
docker exec -e PGPASSWORD="$DB_PASSWORD" coolify-db \
  pg_dump --format=custom --no-acl --no-owner \
  --username "$DB_USERNAME" "${DB_DATABASE:-coolify}" \
  > /data/backups/coolify-db-manual-backup.dmp
```

This creates the backup at: `/data/backups/coolify-db-manual-backup.dmp`

### 2. Copy the `.env` file
Run:

```sh
cp /data/coolify/source/.env /data/backups/coolify-source.env
```

This creates a copy at:

`/data/backups/coolify-source.env`

### 3. Back up SSH keys
If you may restore this backup on another server later, also back up the Coolify SSH keys.

Run:

```sh
mkdir -p /data/backups/coolify-ssh-keys
cp -R /data/coolify/ssh/keys/. /data/backups/coolify-ssh-keys/
```

This creates `/data/backups/coolify-ssh-keys/`

These files help the restored instance reconnect to servers managed by Coolify.

### 4. Keep the restore files
Keep these files somewhere safe:
- `/data/backups/coolify-db-manual-backup.dmp`
- `/data/backups/coolify-source.env`
- `/data/backups/coolify-ssh-keys/`
