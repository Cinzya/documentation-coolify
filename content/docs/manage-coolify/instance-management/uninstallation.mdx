---
title: Uninstall Coolify
description: Completely remove a self-hosted Coolify instance from your server, including containers, volumes, network, and data directory.
---

# Uninstall Coolify
Uninstalling Coolify removes the self-hosted control plane and related Docker resources from your server.

This guide is for **self-hosted** users who want to fully remove their Coolify instance.

If you use **Coolify Cloud**, there is nothing to uninstall on your side for the Coolify instance.
To stop using Cloud, cancel your subscription from [Billing](https://app.coolify.io/subscription/).

## Before you uninstall
Use this checklist first:
- back up any data you may need later
- verify you are connected to the correct server before running removal commands

Backup guide:
- [Back up your Coolify instance](shadow-to-do)

::: danger Destructive action
Uninstallation permanently removes Coolify components and can remove related data.

If you may need to restore later, keep backups of:
- Coolify database data
- `/data/coolify/source/.env`
- `/data/coolify` (contains instance data like proxy config, SSL certs, SSH keys, and related files)
:::

::: tip Tip
Your existing applications will continue to work fine after uninstalling Coolify, since they run as Docker containers independently of Coolify on your server.
:::


## Uninstall process
Run these steps in order:
- [Stop and remove containers](#1-stop-and-remove-containers)
- [Remove Docker volumes](#2-remove-docker-volumes)
- [Remove Docker network](#3-remove-docker-network)
- [Delete Coolify data directory](#4-delete-coolify-data-directory)
- [Remove Docker images](#5-remove-docker-images-optional)

---

### 1. Stop and remove containers
Stop all Coolify-related containers and remove them:

```sh
sudo docker stop -t 0 coolify coolify-realtime coolify-db coolify-redis coolify-proxy coolify-sentinel
sudo docker rm coolify coolify-realtime coolify-db coolify-redis coolify-proxy coolify-sentinel
```

::: tip Tip
`-t 0` stops containers immediately without waiting for timeout.
:::

---

### 2. Remove Docker volumes
Remove Coolify volumes:

```sh
sudo docker volume rm coolify-db coolify-redis
```

::: warning Important
This permanently deletes data stored in those volumes.
Only run this if you have required backups.
:::

---

### 3. Remove Docker network
Remove the Coolify Docker network:

```sh
sudo docker network rm coolify
```

::: info Note
If Docker says the network is still in use, check for remaining containers attached to it, remove them, then run this command again.
:::

---

### 4. Delete Coolify data directory
Delete the Coolify data directory from the server:

```sh
sudo rm -rf /data/coolify
```

::: warning Important
Double-check the path before running this command.
This action is irreversible.
:::

---

### 5. Remove Docker images (optional)
To free disk space, remove Coolify-related images:

```sh
sudo docker rmi ghcr.io/coollabsio/coolify:latest
sudo docker rmi ghcr.io/coollabsio/coolify-helper:latest
sudo docker rmi ghcr.io/coollabsio/coolify-realtime:latest
sudo docker rmi postgres:15-alpine
sudo docker rmi redis:7-alpine
```

If you used the default proxy image:

```sh
sudo docker rmi traefik:v3.6
```

If you used Caddy proxy instead:

```sh
sudo docker rmi lucaslorentz/caddy-docker-proxy:2.8-alpine
```


## Verify uninstallation
After uninstalling, check that:
- Coolify containers are no longer present while running the command `docker ps -a`
- `/var/lib/docker/volumes/coolify-db` is removed
- `/var/lib/docker/volumes/coolify-redis` is removed
- `/data/coolify` no longer exists

At this point, Coolify is fully removed from the server.
