---
title: Deploy your first database
description: Deploy your first Redis database on Coolify using the one-click resources list and test the connection from terminal.
---

# Deploy your first database
Deploying your first database in Coolify helps you validate storage, networking, and credentials in a simple flow.

In this guide, you will deploy **Redis** from the one-click resources list.

This path is ideal for a first database deployment because:
- setup is fast and beginner-friendly
- Redis is lightweight and easy to test from terminal
- you can verify connection in a few minutes

## Before you start
Make sure:
- Coolify is installed and accessible
- you have at least one connected server in Coolify (if you are self-hosting, you can use the same server where Coolify runs which will be `localhost`)
- your server allows inbound traffic for the host port you plan to map for Redis

If you are not ready yet, first follow:
- [Start with Self-hosted](/get-started/start-with-self-hosted)
- [Start with Coolify Cloud](/get-started/start-with-cloud)


## Deploy your first Redis database
### 1. Create your first project
On the Coolify dashboard:
- click **New Project**
- enter a project name (example: `my-first-project`)
- click **Continue**

<ZoomableImage src="shadow-to-do" alt="Create a project in Coolify" />

::: tip Tip
If you already have a project, skip this step and continue to Step 2.
:::

---

### 2. Create a new resource
Open your project and click **Create New Resource**.

<ZoomableImage src="shadow-to-do" alt="Create new resource in Coolify project" />

---

### 3. Choose Redis from database list
In the resource list:
- search for **Redis**
- click **Redis**

<ZoomableImage src="shadow-to-do" alt="Select Redis from one-click database list" />

---

### 4. Configure port mappings
Set a port mapping so you can connect from terminal.

Example:
- **Ports Mappings**: `6380:6379`

This means:
- `6380` = host/server port you connect to
- `6379` = Redis port inside the container

<ZoomableImage src="shadow-to-do" alt="Configure Redis port mapping in Coolify" />

::: warning Important
Exposing a database port publicly is risky in production.
In this guide, Redis is exposed only for quick testing and learning.

For real production setups, avoid public database exposure unless absolutely required, and enforce strict network controls.

If `6380` is already used on your server, choose another free host port (for example `6381:6379`).
:::

---

### 5. Deploy
Click the **Deploy** button.

<ZoomableImage src="shadow-to-do" alt="Deploy Redis database on Coolify" />

After deployment, keep these values ready:
- server IP address
- mapped host port (example: `6380`)
- Redis password from Coolify dashboard

---

### 6. Connect to Redis from terminal
Use `redis-cli` from your terminal:

```sh
redis-cli -h <server-ip> -p <host-port> -a <redis-password>
```

Example:

```sh
redis-cli -h 203.0.113.10 -p 6380 -a "your-password"
```

Then run:

```sh
PING
```

If everything is working, Redis returns:

```txt
PONG
```

::: tip No `redis-cli` installed locally?
You can run `redis-cli` from a temporary Docker container instead:

```sh
docker run --rm -it redis:alpine redis-cli --user default -h <server-ip> -p <host-port> -a "<redis-password>" PING
```

If the connection works, it returns `PONG`.
:::


## Common first-deploy issues
### 1. Connection refused
Check:
- Redis deployment is in **running** state
- host port in `Ports Mappings` is correct
- server firewall allows the mapped host port

### 2. Authentication failed
Check:
- password matches the Redis password shown in Coolify
- no extra spaces/quotes were added when copying password

### 3. Command not found: `redis-cli`
Install Redis CLI locally, or run it from a temporary container:

```sh
docker run --rm -it redis:alpine redis-cli -h <server-ip> -p <host-port> -a <redis-password>
```


## What to do next
- [Deploy your first app](/get-started/deploy-your-first-app)
- [Deploy your first service](/get-started/deploy-your-first-service)
- Learn more about [Databases](/databases/index)
