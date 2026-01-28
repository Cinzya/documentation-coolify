---
title: Coolify Concepts
description: Learn core Coolify concepts including servers, resources, environments, projects, Docker containers, reverse proxy, and team management basics.
---

::: info Title here
This draws attention to important information
:::

::: warning Title here
This draws attention to important information
:::

::: danger Title here
This draws attention to important information
:::

::: success Title here
This draws attention to important information
:::

::: tip Title here
This draws attention to important information
:::

::: neutral Title here
This draws attention to important information
:::

--


## How deployment works
Application deployment in Coolify follows a defined lifecycle:

### 1. source setup

You connect an application source, choosing one of:

* a Git repository
* a Docker image from a registry
* a Docker Compose or similar definition

Coolify saves this configuration in the control plane and associates it with a server.

---

### 2. build phase

If the source needs building (for example code that must compile), Coolify builds a Docker image. Builds can occur:

* on the target server itself
* on a dedicated build server (optional)

The build process uses standard Docker build tools and follows the instructions in Dockerfiles or buildpacks.

---

### 3. deployment phase

Once the image is ready, Coolify deploys it:

* existing containers for the application are stopped
* new containers are created and started
* environment variables and secrets are injected
* persistent volumes are attached
* the local reverse proxy configuration is updated

Deployments in Coolify **replace containers immutably** rather than modifying running containers, which improves reliability and repeatability.

---

### 4. runtime management

After deployment, Coolify provides basic runtime controls, including:

* viewing logs
* restarting containers
* executing commands inside containers
* checking simple resource usage

These tools help you manage running workloads, but deeper system monitoring is usually done outside Coolify.

---

## built-in services and monitoring

Coolify’s internal containers include optional tools like `coolify-sentinel`, which can provide:

* host and container metrics
* CPU and memory usage data
* health reporting

These tools are optional and can be enabled per server.

---

## databases and persistent storage

Coolify treats databases (PostgreSQL, MySQL, Redis, etc.) as standard Docker services with persistent storage:

* data is stored in Docker volumes on your servers
* redeploying or restarting containers does not lose data
* Coolify can schedule backups to S3-compatible targets
* restore workflows let you recover data if needed ([Coolify][3])

This keeps your data under your control.

---

## networking and isolation

Coolify uses Docker’s networking features to isolate services. Internal communication between services does not expose ports publicly unless configured.

Only applications connected to the reverse proxy are reachable from the internet.

Coolify does not create cross-server overlay networks. Communication between servers occurs over normal network paths, which may use private networking or VPNs if needed.

---

## security model

Coolify separates control from execution:

**Coolify handles:**

* encrypted storage of secrets
* injection of secrets at runtime
* SSL certificates via the reverse proxy

**You are responsible for:**

* operating system updates
* firewall rules
* SSH access and keys
* general server hardening

This keeps control with you and avoids hidden automation outside your knowledge ([Coolify][3]).

---
