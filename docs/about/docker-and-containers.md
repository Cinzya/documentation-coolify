---
title: Docker and Containers
description: A beginner-friendly guide to Docker images, containers, volumes, and how Coolify uses them.
---

# Docker and containers
If you are new to self-hosting, Docker is the most important concept to understand in Coolify.

Coolify uses Docker as the runtime layer for applications, databases, and services. Instead of installing software directly on your server, Coolify runs each workload inside a container.

This gives you a cleaner, safer setup that is easier to move, update, and recover.

::: tip Tip
Coolify itself also runs in containers. You can verify this on your server by running this:

```bash
docker ps | grep coolify
```
:::


## High-level overview
At a high level, Coolify works with standard Docker primitives:
- **Images** - packaged application blueprints
- **Containers** - running instances created from images
- **Volumes** - persistent storage for stateful data
- **Networks** - private communication between containers
- **Compose definitions** - multi-container service definitions

Because these are standard Docker concepts, your setup remains portable and independent of Coolify.


## Core concepts
1. [Docker images](#docker-images)
2. [Containers](#containers)
3. [Volumes and persistent data](#volumes-and-persistent-data)
4. [Docker networks](#docker-networks)
5. [How Coolify uses them together](#how-coolify-uses-them-together)

---

### Docker images
A **Docker image** is a read-only package that contains everything needed to run software:
- application code
- runtime (Node, PHP, Python, etc.)
- system dependencies
- startup command

Coolify can use images in multiple ways:
- build an image from source code
- build from Dockerfile/Buildpacks/Compose flows
- pull a prebuilt image from a registry

Once an image exists, it can be reused for future deployments.

Learn more in the official Docker docs: [What is an image?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)

---

### Containers
A **container** is a running process created from an image.

In Coolify, each deployed workload runs as one or more containers. This applies to:
- web applications
- worker processes
- databases
- one-click services

Containers are isolated from each other, which helps you:
- avoid dependency conflicts
- run multiple projects on one server
- restart or replace a service without touching others

Coolify manages lifecycle actions for you (start, stop, restart, redeploy), but these are still normal Docker containers on your server.

Learn more in the official Docker docs: [What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)

---

### Volumes and persistent data
Containers are replaceable and volatile, so changes made only inside a container can be lost when it is recreated.
Your data should not live only inside the container filesystem.

A **Docker volume** stores persistent data outside the container filesystem. Coolify attaches volumes for stateful workloads so data survives container recreation.

Typical examples:
- database data directories
- uploaded files
- service state/configuration

This is why redeploying an app usually does not delete its data.

Learn more in the official Docker docs: [Persisting container data](https://docs.docker.com/get-started/docker-concepts/running-containers/persisting-container-data/)

---

### Docker networks
Docker networks let containers talk to each other safely.

Coolify uses Docker networks to:
- connect apps to their internal services (like databases)
- connect application containers to the server's proxy container
- isolate applications from each other

Traffic from users reaches your app through your server's routing setup, then forwards to the correct container.

Learn more in the official Docker docs: [Networking in Docker](https://docs.docker.com/engine/network/)

---

### How Coolify uses them together
When you deploy an application, Coolify coordinates Docker operations like this:

1. Build or pull the target image
2. Create/update container definitions
3. Inject runtime environment configuration
4. Attach networks and persistent volumes
5. Start new containers and update routing
6. Remove old containers after a successful swap (when deployment conditions allow it)

This workflow gives a PaaS-like experience while still using plain Docker under the hood.

::: info Why this matters
If you learn these Docker basics, most Coolify behavior becomes predictable.
When something goes wrong, you can reason about it using image/container/volume/network state.
:::


## What this means for beginners
If you are just starting self-hosting, here is the practical mental model:
- **Image** = what to run
- **Container** = running app
- **Volume** = saved data
- **Network** = who can talk to who

Coolify automates these pieces for you, but they stay standard Docker resources you can inspect and manage directly when needed.

If you want a full beginner path, Docker's official guide starts here: [Docker Get Started](https://docs.docker.com/get-started/)
