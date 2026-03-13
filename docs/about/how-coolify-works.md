---
title: How Coolify works
description: An overview of how Coolify works to deploy and manage applications on your own servers.
---


# How Coolify works
Coolify is an open source, self-hosted platform that helps you build, deploy, and manage applications, databases, and services using Docker. It is designed for people and teams who want an easy PaaS-like experience without the complexity of Kubernetes or managed cloud providers.


## High-level overview
Coolify is a **control plane** that coordinates Docker workloads across one or more servers you own. You install Coolify once on a server, and then you can connect additional servers to it. 

The core idea is:
- Coolify **manages and orchestrates workloads**
- Docker on each server **runs the applications**
- Each server can run its **own reverse proxy**
- Traffic is routed directly to the application containers
- If Coolify is removed, the applications **continue running** because they depend only on Docker (and reverse proxy, if used)

This design avoids a central traffic bottleneck and creates a true **zero vendor lock-in** architecture.


## Core components
1. [Control plane](#control-plane-coolify-server)
2. [Managed servers](#managed-servers)
3. [Docker containers](#docker-containers)
4. [Reverse proxy](#reverse-proxy-and-traffic-flow)

---

### Control plane (Coolify server)
The **control plane** is the central coordination layer of Coolify. It runs as a set of Docker containers on a single server. 

This is where the web UI, API, and orchestration logic live. You install Coolify on one machine, this becomes the “**main server**.”

The control plane includes the following internal services:
- `coolify` - main backend
- `coolify-db` - PostgreSQL database for storing metadata, secrets, etc..
- `coolify-redis` - Redis for queues, caching, and background jobs
- `coolify-realtime` - Soketi for real-time UI updates and logs streaming
- `coolify-sentinel` - optional service for resource and container monitoring
- `coolify-proxy` - optional Traefik or Caddy instance on the Coolify host to handle traffic routing

These internal services work together to track state, schedule deployments, and coordinate remote actions.

The control plane is generally **not in the traffic path** of your applications, it instructs remote Docker engines to run containers but does not proxy HTTP or HTTPS traffic itself.  

::: info Note
If you choose to deploy applications directly on the main Coolify server, the local reverse proxy will route traffic to those applications just like it does on any other managed server.
:::


### Managed servers
A **managed server** is any machine you control with SSH access, including:
- Cloud virtual machines
- Bare metal servers
- Home lab machines
- ARM and x86 devices
- Old laptops or Macs running Linux

Coolify **does not require a persistent deployment agent** on these servers. Instead, it connects remotely using SSH and runs Docker commands when needed.  
For monitoring, Coolify can optionally run `coolify-sentinel` on a managed server.

This means the server remains usable and independent even without Coolify.

Each managed server handles:
- running containers
- handling builds (if configured)
- running its own reverse proxy (if enabled)
- exposing apps to the internet

Because services run locally on these servers, traffic goes directly from clients to application containers, not through the main Coolify server.


### Docker containers
Every application, database, or service Coolify handles runs as a **Docker container**. 

Containers isolate processes, making it easier to:
- run multiple apps on one machine
- avoid conflicts between ports and dependencies
- restart or replace services consistently

Coolify uses Docker to:
- build images from source using Dockerfiles
- pull prebuilt images from registries
- manage container lifecycle (start, stop, restart)
- attach Docker volumes for persistent data

Because everything is standard Docker, you can manage containers manually with Docker commands outside of Coolify if needed.


### Reverse proxy and traffic flow
Each server managed by Coolify can run its **own reverse proxy container** (Traefik or Caddy). 

This proxy:
- listens on ports **80** (HTTP) and **443** (HTTPS)
- receives incoming web requests
- terminates TLS with certificates
- renews TLS certificates automatically
- routes traffic to the correct application container based on hostname and path.

Because the proxy runs locally:
- Traffic is directly routed to the containers
- Applications remain reachable even if Coolify stops

This is key to the “zero vendor lock-in” of Coolify: **your apps continue running and remain reachable through their existing routing setup even if Coolify stops**


## Zero vendor lock-in
Coolify uses only standard open source tools:
- Docker containers
- SSH connections
- Open Source reverse proxies
- Docker storage volumes

Applications **do not depend** on the Coolify to run. If Coolify is removed:

- containers continue running
- reverse proxies continue routing traffic
- data remains intact

You can manage and run everything directly with Docker if you choose.


## Self-hosted or Coolify Cloud
You can use Coolify in **two ways**:
- **Self-hosted** – you run Coolify on your own servers, with full control.  
- **Coolify Cloud** – we host Coolify for you for convenience.  

All features are the same in both, Cloud just saves you from managing Coolify by yourself. Learn more in our [Self-hosted vs Coolify Cloud comparison](https://coolify.io/docs/shadow-to-do).
