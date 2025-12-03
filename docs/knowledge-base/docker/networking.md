---
title: "Docker Networking & DNS 101"
description: "A beginner-friendly guide to Docker networking concepts for Coolify users - understand how containers communicate, network isolation, and naming conventions."
---

# Docker Networking & DNS 101

This guide explains the essential Docker networking concepts you need to understand to use Coolify effectively. You don't need to be a Docker expert—just knowing these basics will help you deploy and connect your applications successfully.

## Understanding Docker Networks

### What is a Docker Network?

Think of a Docker network as a private local network for your containers. Just like computers on a home network can talk to each other, containers on the same Docker network can communicate with each other directly.

Docker provides an internal DNS server that automatically resolves container names to their IP addresses. This means you can use names instead of IP addresses to connect services.

### Multiple Networks in Coolify

Coolify uses multiple Docker networks to organize and isolate your deployments:

| Network                    | Purpose                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| `coolify`                  | The main network where resources can communicate when "Connect to Predefined Network" is enabled |
| Resource-specific networks | Each Docker Compose stack or service gets its own isolated network (named after its UUID)        |

::: tip Why Multiple Networks?
Network isolation is a security feature. Resources in different networks cannot communicate by default, which prevents accidental data exposure between unrelated applications. You explicitly choose when resources should be able to talk to each other.
:::

## Container Names vs Service Names

Understanding the difference between **container names** and **service names** is crucial for connecting your applications in Coolify. These are two different ways to address a container, and each works under different conditions.

### Service Names (Docker Compose Only)

A **service name** is the name you define in your `docker-compose.yml` file:

```yaml
services:
  webapp: # ← This is the service name
    image: my-app:latest
  database: # ← This is the service name
    image: postgres:16
```

**When service names work:**

- ✅ Containers are in the **same Docker Compose stack**
- ✅ Containers share the same network (automatically created by Compose)

**Example usage within a Compose stack:**

```yaml
services:
  webapp:
    image: my-app:latest
    environment:
      - DATABASE_HOST=database # Use service name
      - DATABASE_PORT=5432
  database:
    image: postgres:16
```

The `webapp` container can reach `database` simply by using the service name because they're deployed together in the same Compose stack.

### Container Names (Cross-Deployment Communication)

A **container name** is the actual name Docker assigns to the running container. In Coolify, container names follow specific patterns based on the resource type.

**When to use container names:**

- ✅ Connecting resources from **different deployments**
- ✅ Connecting to standalone databases or applications
- ✅ When "Connect to Predefined Network" is enabled on both resources

#### Container Naming Patterns in Coolify

| Resource Type             | Container Name Pattern           | Example                        |
| ------------------------- | -------------------------------- | ------------------------------ |
| Applications              | `{uuid}` or `{uuid}-{timestamp}` | `abc123xy` or `abc123xy-1430u` |
| Databases                 | `{uuid}`                         | `xyz789ab`                     |
| Services (one-click)      | `{serviceName}-{uuid}`           | `postgres-def456gh`            |
| Docker Compose containers | `{serviceName}-{uuid}`           | `webapp-abc123xy`              |
| Preview deployments       | `{uuid}-pr-{pull_request_id}`    | `abc123xy-pr-42`               |

::: info Finding Container Names
You can find the exact container name in Coolify's UI:

1. Open your resource (application, database, or service)
2. Check the resource details or deployment logs
3. The container name will be displayed there
   :::

### Service Name vs Container Name: Quick Reference

| Scenario                                                      | What to Use    | Example              |
| ------------------------------------------------------------- | -------------- | -------------------- |
| Two services in the **same** Docker Compose file              | Service name   | `database`           |
| App connecting to a **separately deployed** database          | Container name | `postgres-xyz789ab`  |
| App connecting to a **separately deployed** one-click service | Container name | `redis-abc123xy`     |
| Services within the **same** one-click service stack          | Service name   | `db`, `redis`, `app` |

## Connecting Resources: A Practical Guide

### Scenario 1: Within the Same Docker Compose Stack

When your `docker-compose.yml` defines multiple services, they automatically share a network and can communicate using service names.

```yaml
services:
  app:
    image: node:20
    environment:
      - REDIS_HOST=cache # ← Use service name
      - DATABASE_URL=postgres://user:pass@db:5432/myapp # ← Use service name

  db:
    image: postgres:16

  cache:
    image: redis:7
```

**No additional configuration needed**—this works out of the box.

### Scenario 2: Connecting to a Separately Deployed Database

If you deploy your application and database as separate Coolify resources:

1. **Enable networking on both resources:**

   - Go to your application settings → Enable "Connect to Predefined Network"
   - Go to your database settings → Enable "Connect to Predefined Network"

2. **Find the database container name:**

   - Open your database in Coolify
   - Note the UUID (this is your container name), e.g., `postgres-xyz789ab`

3. **Configure your application:**
   ```
   DATABASE_HOST=postgres-xyz789ab
   DATABASE_PORT=5432
   ```

### Scenario 3: Connecting to a One-Click Service

One-click services in Coolify are Docker Compose stacks with multiple containers. To connect from an external application:

1. **Enable "Connect to Predefined Network"** on both the service and your application

2. **Find the specific container name** within the service:

   - One-click services use the pattern `{serviceName}-{serviceUUID}`
   - For example, a Supabase deployment with UUID `abc123` would have containers like:
     - `supabase-db-abc123`
     - `supabase-studio-abc123`
     - `supabase-auth-abc123`

3. **Connect using the full container name:**
   ```
   SUPABASE_DB_HOST=supabase-db-abc123
   ```

## Ports: Exposed vs Mapped

### Exposed Ports (Internal Only)

An **exposed port** is a port that a container listens on internally. Other containers on the same network can connect to it, but it's **not accessible from outside** Docker.

```yaml
services:
  database:
    image: postgres:16
    # Port 5432 is exposed internally by the PostgreSQL image
    # Only containers in the same network can reach it
```

When you assign a domain in Coolify, the proxy (Traefik/Caddy) connects to these exposed ports internally and makes them accessible through your domain.

### Mapped Ports (Publicly Accessible)

A **mapped port** binds a container port directly to your server's port:

```yaml
services:
  app:
    image: my-app:latest
    ports:
      - "3000:3000" # Server port 3000 → Container port 3000
```

::: danger Security Warning
Mapping ports makes them publicly accessible from the internet! Never map database ports in production without additional security measures (firewall rules, VPN, etc.).

Prefer using Coolify's proxy with domains for web applications, and the predefined network for internal service communication.
:::

#### Port Mapping Syntax

```yaml
ports:
  - "8080:80" # Server:Container - Public access on port 8080
  - "127.0.0.1:5432:5432" # Localhost only - Accessible from the server, not the internet
```

## The Predefined Network

The predefined network (`coolify` network) is a shared network that allows different Coolify resources to communicate.

### When to Enable It

Enable "Connect to Predefined Network" when:

- Your application needs to connect to a separately deployed database
- Multiple independent applications need to communicate
- You're connecting to one-click services from custom applications

### How It Works

```
┌─────────────────────────────────────────────────────────┐
│                  Predefined Network (coolify)            │
│                                                          │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐ │
│  │   App A      │   │  Database    │   │  App B       │ │
│  │  abc123xy    │◄─►│  xyz789ab    │◄─►│  def456gh    │ │
│  └──────────────┘   └──────────────┘   └──────────────┘ │
│                                                          │
│  All can communicate using container names               │
└─────────────────────────────────────────────────────────┘
```

Without the predefined network enabled, each resource lives in isolation:

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ Network: abc123  │     │ Network: xyz789  │     │ Network: def456  │
│  ┌────────────┐  │     │  ┌────────────┐  │     │  ┌────────────┐  │
│  │   App A    │  │  ✗  │  │  Database  │  │  ✗  │  │   App B    │  │
│  └────────────┘  │     │  └────────────┘  │     │  └────────────┘  │
└──────────────────┘     └──────────────────┘     └──────────────────┘
        Cannot communicate across network boundaries
```

## Common Mistakes and Solutions

### Using `localhost` Inside Containers

Inside a container, `localhost` refers to **that container itself**, not your server or other containers.

```bash
# ❌ Wrong - looks for database inside the same container
DATABASE_HOST=localhost

# ✅ Correct - uses the database container name
DATABASE_HOST=postgres-xyz789ab
```

### Using Service Names Across Different Deployments

Service names only work within the same Docker Compose stack.

```bash
# ❌ Wrong - "database" is only resolvable within its own Compose stack
DATABASE_HOST=database

# ✅ Correct - use the full container name for cross-deployment
DATABASE_HOST=postgres-xyz789ab
```

### Forgetting to Enable Predefined Network

If you get "connection refused" or "host not found" errors when connecting to another Coolify resource:

1. Check that **both** resources have "Connect to Predefined Network" enabled
2. Verify you're using the correct container name (with UUID)
3. Ensure you're using the correct port

### Port Confusion

Remember the difference between:

- **Container port**: The port the application listens on inside the container
- **Host/mapped port**: The port exposed on your server

When connecting container-to-container, always use the **container port**:

```bash
# Container listens on port 5432 internally
# Even if mapped as 5433:5432, other containers connect to 5432
DATABASE_PORT=5432
```

## Quick Reference Table

| I want to...                               | Solution                                              |
| ------------------------------------------ | ----------------------------------------------------- |
| Connect services in the same Compose stack | Use service names directly                            |
| Connect to a separate database             | Enable predefined network on both, use container name |
| Connect to a one-click service             | Enable predefined network, use `{serviceName}-{uuid}` |
| Make an app publicly accessible            | Set a domain in Coolify (proxy handles it)            |
| Access a service from the server itself    | Map port to `127.0.0.1:{port}:{port}`                 |

## Related Documentation

- [Destinations (Docker Networks in Coolify)](/knowledge-base/destinations/)
- [Docker Compose in Coolify](/knowledge-base/docker/compose)
- [Environment Variables](/knowledge-base/environment-variables)
