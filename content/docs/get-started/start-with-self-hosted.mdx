---
title: Start with Self-hosted
description: Install and run self-hosted Coolify with a clear path for automated or manual setup.
---

# Start with Self-hosted
Self-hosting Coolify means you run the Coolify instance on infrastructure you control.

This path is ideal if you want:
- full control over your setup
- a free Coolify software path (you still pay your own server costs)
- ownership of updates, backups, and operations

If you are still deciding between Cloud and self-hosted, read [Choose your path](/get-started/choose-your-path) first.


## Before you install
Use this checklist before starting either install method.

### 1. Server access
You need a Linux server with SSH access.

Your server can be:
- VPS (Virtual Private Server)
- dedicated server
- virtual machine
- old laptop
- Raspberry Pi (64-bit)

::: info Note
1. It’s best to use a fresh server for Coolify to avoid any conflicts with existing applications.

2. If you haven't picked a server provider yet, consider using [Hetzner](https://coolify.io/hetzner). You can even use our [referral link](https://coolify.io/hetzner) to support the project.
:::

### 2. Supported CPU architecture
Coolify supports: `amd64` and `arm64` architectures

### 3. Supported operating systems
| Base | Distributions | Notes |
| :--- | :--- | :--- |
| Debian-based | Debian, Ubuntu | Ubuntu non-LTS: use Manual install |
| Red Hat-based | CentOS, Fedora, Red Hat, AlmaLinux, Rocky, TencentOS, Asahi | Docker may need manual pre-install on some variants |
| SUSE-based | SLES, SUSE, openSUSE | Supported |
| Arch-based | Arch Linux | Supported |
| Alpine-based | Alpine Linux | Supported |
| Raspberry Pi OS | Raspberry Pi OS (64-bit) | Use 64-bit image |

::: warning Linux-only support
Coolify only runs on Linux-based operating systems.
The table above reflects distributions where Coolify is known to run well, based on project testing and community reports.

If you are using a Linux distro not listed above, feel free to try installing Coolify and let us know your results.
:::

### 4. Minimum recommended resources
- CPU: 2 cores
- RAM: 2 GB
- Storage: 30 GB free

These are practical minimums. If you deploy multiple workloads, use more resources.

<Callout type="tip" title="If you are starting on a tight budget">

Coolify can run on smaller servers (for example: 1 CPU core, 512 MB RAM, 4 GB disk), but this is not recommended.

If cost is a concern, start with a server 1 CPU core and 1 GB RAM, and upgrade the server as your workloads grow or if it becomes slow due to limited resources.

</Callout>

### 5. Firewall and SSH basics
Before installation, make sure:
- SSH is configured correctly
- required ports are open

Use:
- [OpenSSH guide](/knowledge-base/server/openssh)
- [Firewall guide](/knowledge-base/server/firewall)

### 6. Root user
To install Coolify, you need either:
- `root` user access, or
- a user with `sudo` privileges


## Choose your installation method
The automated method is recommended for most users.

Use manual installation only if:
- you are on non-LTS Ubuntu (for example `24.10`)
- the automated script is not suitable for your environment
- you intentionally want full manual control over the installation process



::: tabs key:selfhosted-install-mode
== Automated (Recommended)

#### 1. Run the install script

```sh
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

> The installer automatically:
> - installs required packages (curl, wget, git, jq, openssl)
> - installs Docker Engine (when supported by your distro)
> - configures Docker settings (logging, daemon)
> - sets up Coolify directories under `/data/coolify`
> - configures SSH keys for server management
> - installs and starts Coolify
> 
> View the [Script's Source Code](https://github.com/coollabsio/coolify/blob/v4.x/scripts/install.sh)

<Callout type="warning" title="Heads up!">

  1. If Docker is installed through snap, remove it and install Docker Engine using the [official Docker method](https://docs.docker.com/engine/install/) or let the install script handle it automatically.

  2. The automatic installation script only works with Ubuntu LTS versions (20.04, 22.04, 24.04). If you're using a non-LTS version (e.g., 24.10), use the Manual tab.
</Callout>

---
  
#### 2. Open the dashboard
Open Coolify dashboard URL in the browser `http://203.0.113.1:8000` (replace the `203.0.113.1` with the IP address of your server) and create your admin account.

That's it!, you can start using Coolify.

<Callout type="danger" title="Important">

  **Create your admin account immediately after installation. If someone else reaches the registration page first, they can gain root access.**
</Callout>

==

== Manual
Use this when you need full control over the installation process or the automated method is not suitable.

### Prerequisites
- [curl](https://curl.se/) installed
- Docker Engine installed (version 24+), using official Docker docs:
  [Install Docker Engine](https://docs.docker.com/engine/install/#server)

---

#### 1. Create required directories
Create the base directories for Coolify under `/data/coolify`:

```sh
mkdir -p /data/coolify/{source,ssh,applications,databases,backups,services,proxy,webhooks-during-maintenance}
mkdir -p /data/coolify/ssh/{keys,mux}
mkdir -p /data/coolify/proxy/dynamic
```

---

#### 2. Generate and register SSH key
Generate an SSH key for Coolify to manage your server:

```sh
ssh-keygen -f /data/coolify/ssh/keys/id.root@host.docker.internal -t ed25519 -N '' -C root@coolify
```

Then, add the public key to your `~/.ssh/authorized_keys`:

```sh
cat /data/coolify/ssh/keys/id.root@host.docker.internal.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

<Callout type="tip" title="Existing SSH keys can be used">

If you already have an SSH key, you can skip generating a new one, but remember to add it to your Coolify instance after installation.

</Callout>

---

#### 3. Download required files
Download the necessary files from Coolify’s CDN to `/data/coolify/source`:

```sh
curl -fsSL https://cdn.coollabs.io/coolify/docker-compose.yml -o /data/coolify/source/docker-compose.yml
curl -fsSL https://cdn.coollabs.io/coolify/docker-compose.prod.yml -o /data/coolify/source/docker-compose.prod.yml
curl -fsSL https://cdn.coollabs.io/coolify/.env.production -o /data/coolify/source/.env
curl -fsSL https://cdn.coollabs.io/coolify/upgrade.sh -o /data/coolify/source/upgrade.sh
```

---

#### 4. Set permissions
Set the correct permissions for the Coolify files and directories:

```sh
chown -R 9999:root /data/coolify
chmod -R 700 /data/coolify
```
---

#### 5. Generate secure environment values
Update the `.env` file with secure random values:

```sh
sed -i "s|APP_ID=.*|APP_ID=$(openssl rand -hex 16)|g" /data/coolify/source/.env
sed -i "s|APP_KEY=.*|APP_KEY=base64:$(openssl rand -base64 32)|g" /data/coolify/source/.env
sed -i "s|DB_PASSWORD=.*|DB_PASSWORD=$(openssl rand -base64 32)|g" /data/coolify/source/.env
sed -i "s|REDIS_PASSWORD=.*|REDIS_PASSWORD=$(openssl rand -base64 32)|g" /data/coolify/source/.env
sed -i "s|PUSHER_APP_ID=.*|PUSHER_APP_ID=$(openssl rand -hex 32)|g" /data/coolify/source/.env
sed -i "s|PUSHER_APP_KEY=.*|PUSHER_APP_KEY=$(openssl rand -hex 32)|g" /data/coolify/source/.env
sed -i "s|PUSHER_APP_SECRET=.*|PUSHER_APP_SECRET=$(openssl rand -hex 32)|g" /data/coolify/source/.env
```

<Callout type="warning" title="Important">

  Generate these values only the first time you install Coolify. Changing these values later can break your installation. Keep them safe!

</Callout>

---

#### 6. Create Docker network
```sh
docker network create --attachable coolify
```

---

#### 7. Start Coolify
Launch Coolify using Docker Compose:

```sh
docker compose --env-file /data/coolify/source/.env -f /data/coolify/source/docker-compose.yml -f /data/coolify/source/docker-compose.prod.yml up -d --pull always --remove-orphans --force-recreate
```

<Callout type="info" title="Note">

  You might have to do `docker login` at this point if you have any issues above.

</Callout>

---

#### 8. Open the dashboard
Visit `http://203.0.113.1:8000` on your browser (replace the `203.0.113.1` with the IP address of your server) and create your admin account.

==

== Raspberry Pi OS
Use this when you are installing Coolify on a Raspberry Pi.

### Prerequisites
To run Coolify on a Raspberry Pi, you will need one of the following Raspberry Pi models:
  - Raspberry Pi Zero 2 W
  - Raspberry Pi 400
  - Raspberry Pi 3 (all models)
  - Raspberry Pi 4 (all models)
  - Raspberry Pi 5 (all models)

---
  
### Installation

1. Download and install the [Raspberry Pi Imager](https://www.raspberrypi.com/software/) on your computer.

2. Insert your microSD card into your computer's card reader.

3. Open Raspberry Pi Imager and select your device:
   - Click `Choose Device`
   - Select your Raspberry Pi model

4. Select the Operating System:
   - Click `Choose OS`
   - Navigate to `Raspberry Pi OS (other)`
   - Select `Raspberry Pi OS Lite (64-bit)`

<Callout type="warning" title="Caution">

  You must select one of the 64-bit OS versions as Coolify is not compatible with 32-bit versions.
</Callout>

<Callout type="info" title="Note">

  While you can use the full desktop version `Raspberry Pi OS (64-bit)`/`Raspberry Pi OS Full (64-bit)` or even `Ubuntu`, we recommend the `Raspberry Pi OS Lite` version as it uses fewer resources.
</Callout>

5. Choose your Storage:
   - Click `Choose Storage`
   - Select your microSD card
   - Double-check you've selected the correct drive to avoid data loss

6. Click `Next` and select `Edit settings` for OS Customization.
   - Navigate to `Services` and enable SSH with a public key.
   - Configure other options as needed

<Callout type="warning" title="Caution">

  The SSH key must not have a passphrase or 2FA enabled, otherwise you will not be able to complete the onboarding process.
</Callout>

7. Finish the installation onto the SD card.

8. Once complete, insert the microSD card into your Raspberry Pi and power it on.


<Callout type="warning" title="Important">

1. You must select one of the 64-bit OS versions as Coolify is not compatible with 32-bit versions.

2. The SSH key must not have a passphrase or 2FA enabled, otherwise you will not be able to complete the onboarding process.
</Callout>

After your Raspberry Pi boots up, install Coolify by following the installation method above (scroll up and select the **Automated** or **Manual** tab).
==
:::

<Callout type="neutral" title="Help">

  If you get stuck at any step, feel free to join our [Discord community](https://coolify.io/discord) and create a post in the support forum channel.

</Callout>

## After setup
Once your instance is running:

1. Take a backup of `/data/coolify/source/.env`. This file contains the Coolify database password and the encryption key used to encrypt the database. Without this `.env` file, you will not be able to restore backups for your Coolify instance.


2. Start deploying on the same server (`localhost`) where Coolify is running:
   - [Deploy your first app](/get-started/deploy-your-first-app)
   - [Deploy your first database](/get-started/deploy-your-first-database)
   - [Deploy your first service](/get-started/deploy-your-first-service)

3. If you want to expand beyond a single-server setup, continue with:
   - [Add and validate servers](shadow-to-do)
   - [Build server](shadow-to-do)
   - [Multiple servers](shadow-to-do)

For ongoing operations, see:
- [Upgrade](shadow-to-do)
- [Downgrade](shadow-to-do)
- [Uninstallation](shadow-to-do)

## Advanced installations
These options are optional and mostly useful for automation or custom infrastructure requirements.

::: warning Safety first
  Test advanced changes on a non-production server first. If you manage production workloads, keep backups and a rollback path before applying advanced install settings.
:::

---

### 1. Root user
Use this when you want to pre-create the root account during installation, so the registration page is never exposed.

| Variable | Required | Notes |
| :--- | :--- | :--- |
| `ROOT_USERNAME` | Yes | 3-255 characters. Allowed: letters, numbers, spaces, underscores, and hyphens. |
| `ROOT_USER_EMAIL` | Yes | Must be a valid email format with a valid DNS record, up to 255 characters. |
| `ROOT_USER_PASSWORD` | Yes | At least 8 characters with uppercase, lowercase, number, and special symbol. |

::: tabs key:selfhosted-install-mode
== Automated

```sh
env ROOT_USERNAME=RootUser \
ROOT_USER_EMAIL=example@example.com \
ROOT_USER_PASSWORD='StrongPassword123!' \
bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
```

If you are not logged in as `root`:

```sh
sudo -E env ROOT_USERNAME=RootUser \
ROOT_USER_EMAIL=example@example.com \
ROOT_USER_PASSWORD='StrongPassword123!' \
bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
```

==

== Manual

Edit:

```sh
nano /data/coolify/source/.env
```

Add:

```sh
ROOT_USERNAME=RootUser
ROOT_USER_EMAIL=example@example.com
ROOT_USER_PASSWORD='StrongPassword123!'
```

Then run:

```sh
docker compose --env-file /data/coolify/source/.env -f /data/coolify/source/docker-compose.yml -f /data/coolify/source/docker-compose.prod.yml up -d --pull always --remove-orphans --force-recreate
```
==
:::

---

### 2. Custom Docker network
Use this when you need a custom Docker address pool because of network overlap or infrastructure policy.

| Variable | Required | Notes |
| :--- | :--- | :--- |
| `DOCKER_ADDRESS_POOL_BASE` | Yes | valid CIDR, for example `10.0.0.0/8` |
| `DOCKER_ADDRESS_POOL_SIZE` | Yes | numeric value (recommended `16-28`) |
| `DOCKER_POOL_FORCE_OVERRIDE` | No | set `true` only to override an existing host pool |

::: tabs key:selfhosted-install-mode
== Automated

```sh
env DOCKER_ADDRESS_POOL_BASE=10.0.0.0/8 \
DOCKER_ADDRESS_POOL_SIZE=24 \
bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
```

Optional override:

```sh
env DOCKER_ADDRESS_POOL_BASE=10.0.0.0/8 \
DOCKER_ADDRESS_POOL_SIZE=24 \
DOCKER_POOL_FORCE_OVERRIDE=true \
bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
```

==

== Manual

Edit:

```sh
nano /data/coolify/source/.env
```

Add:

```sh
DOCKER_ADDRESS_POOL_BASE=10.0.0.0/8
DOCKER_ADDRESS_POOL_SIZE=24
DOCKER_POOL_FORCE_OVERRIDE=false
```

Then run:

```sh
docker compose --env-file /data/coolify/source/.env -f /data/coolify/source/docker-compose.yml -f /data/coolify/source/docker-compose.prod.yml up -d --pull always --remove-orphans --force-recreate
```
==
:::

---

### 3. Custom registry source
Use this when you want Coolify images pulled from a different registry source.

| Variable | Default | Allowed values |
| :--- | :--- | :--- |
| `REGISTRY_URL` | `ghcr.io` | `ghcr.io`, `docker.io` |

::: tabs key:selfhosted-install-mode
== Automated

```sh
env REGISTRY_URL=docker.io bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
```

If you are not logged in as `root`:

```sh
sudo -E env REGISTRY_URL=docker.io bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
```

==

== Manual

Edit:

```sh
nano /data/coolify/source/.env
```

Add:

```sh
REGISTRY_URL=docker.io
```

Then run:

```sh
docker compose --env-file /data/coolify/source/.env -f /data/coolify/source/docker-compose.yml -f /data/coolify/source/docker-compose.prod.yml up -d --pull always --remove-orphans --force-recreate
```
==
:::

<Callout type="tip" title="Tip">

  The registry can be changed after installing Coolify by following the steps above.
</Callout>

---

### 4. Compose overrides
Use this when you need persistent customization of Coolify containers (ports, labels, resources, command overrides).

| File path | Purpose |
| :--- | :--- |
| `/data/coolify/source/docker-compose.custom.yml` | custom compose overrides that persist across upgrades |


The Compose services are defined with these names — you must use these exact names in your override file:

| Service name | Container name     | Description              |
|--------------|:-------------------|:-------------------------|
| `coolify`    | `coolify`          | Main Coolify application |
| `postgres`   | `coolify-db`       | PostgreSQL database      |
| `redis`      | `coolify-redis`    | Redis cache              |
| `soketi`     | `coolify-realtime` | WebSocket server         |

---

#### Examples

#### A. Add Container Labels

Add labels for external tooling such as monitoring or log aggregation:

```yaml
services:
  coolify:
    labels:
      com.example.monitoring: "true"
      com.example.environment: "production"
```

---

#### B. Set Resource Limits

Restrict CPU and memory usage for the main Coolify container:

```yaml
services:
  coolify:
    cpus: 2.0
    mem_limit: 2G
    mem_reservation: 512M
```

See the Docker Compose documentation for the full list of available attributes: [cpus](https://docs.docker.com/reference/compose-file/services/#cpus?utm_source=coolify.io), [mem_limit](https://docs.docker.com/reference/compose-file/services/#mem_limit?utm_source=coolify.io), [mem_reservation](https://docs.docker.com/reference/compose-file/services/#mem_reservation?utm_source=coolify.io), and [other resource constraints](https://docs.docker.com/reference/compose-file/services/#cpu_count?utm_source=coolify.io).

---

#### C. Change Port Binding

The port number can be changed via the `APP_PORT` variable in Coolify's `.env` file (`/data/coolify/source/.env`). However, the override file lets you control *how* the port is bound — something `.env` cannot do.

Bind the Coolify UI to localhost only, so it is only accessible through a reverse proxy:

```yaml
services:
  coolify:
    ports:
      - "127.0.0.1:8000:8080"
```

Or close the port entirely and rely on the Docker network (useful when the Coolify Proxy is enabled and configured for the Coolify Dashboard):

```yaml
services:
  coolify:
    ports: !override []
```

::: warning
If you remove or restrict port access, make sure you have another way to reach the Coolify UI (e.g., a reverse proxy). Otherwise you will lock yourself out.
:::

---

#### D. Adjust Database Configuration

Add custom PostgreSQL parameters:

```yaml
services:
  postgres:
    command: postgres -c max_connections=200 -c shared_buffers=512MB
```

---

#### E. Combine Multiple Customizations

A single override file can modify multiple services:

```yaml
services:
  coolify:
    mem_limit: 2G
    labels:
      com.example.monitoring: "true"

  postgres:
    mem_limit: 1G

  redis:
    mem_limit: 256M
```
::: tabs key:selfhosted-install-mode
== Automated

Create override file:

```sh
nano /data/coolify/source/docker-compose.custom.yml
```

Validate:

```sh
cd /data/coolify/source
docker compose -f docker-compose.yml -f docker-compose.prod.yml -f docker-compose.custom.yml config
```

Apply by re-running install script:

```sh
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

==

== Manual

Create override file:

```sh
nano /data/coolify/source/docker-compose.custom.yml
```

Validate:

```sh
cd /data/coolify/source
docker compose -f docker-compose.yml -f docker-compose.prod.yml -f docker-compose.custom.yml config
```

Apply with your manual compose start command:

```sh
docker compose --env-file /data/coolify/source/.env -f /data/coolify/source/docker-compose.yml -f /data/coolify/source/docker-compose.prod.yml -f /data/coolify/source/docker-compose.custom.yml up -d --pull always --remove-orphans --force-recreate
```
==
:::
