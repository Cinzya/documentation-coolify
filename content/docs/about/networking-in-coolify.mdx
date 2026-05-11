---
title: Networking in Coolify
description: How traffic, domains, Docker networks, and proxy routing work in Coolify.
---

# Networking in Coolify
Networking is what connects your users to your apps, and your apps to their internal services.

Coolify keeps networking simple by building on standard Docker networking and a server-local reverse proxy (Traefik or Caddy).


## High-level overview
At a high level, Coolify networking works like this:
- users send requests to your server
- your server's proxy receives the request
- the proxy routes traffic to the correct container
- containers communicate over Docker networks

This model avoids routing application traffic through a central Coolify bottleneck.


## Core components
1. [Public traffic routing](#public-traffic-routing)
2. [Docker networks for workloads](#docker-networks-for-workloads)
3. [Proxy models (Traefik, Caddy, or none)](#proxy-models-traefik-caddy-or-none)
4. [How apps connect to databases and services](#how-apps-connect-to-databases-and-services)

---

### Public traffic routing
For HTTP/HTTPS traffic, Coolify uses a reverse proxy container named `coolify-proxy` on each managed server where proxying is enabled.

The proxy:
- listens on ports `80` and `443`
- terminates TLS certificates
- routes requests by domain/path to the right container

Because the proxy is local to each server, requests go directly to workloads on that server.

---

### Docker networks for workloads
Coolify uses Docker networks to isolate and connect workloads.

In practice:
- each server has one or more destination networks
- Coolify creates missing networks when needed
- the proxy is connected to relevant app/service networks so routing works
- Docker Compose and service deployments use project-scoped network names

This gives clear isolation while still allowing required communication paths.

---

### Proxy models (Traefik, Caddy, or none)
A server in Coolify can use different proxy modes:
- **Traefik**
- **Caddy**
- **None**

If proxy mode is `none`, Coolify does not manage HTTP routing/TLS for that server.

This is useful for advanced setups where you handle networking with your own external proxy or custom infrastructure.

---

### How apps connect to databases and services
Inside a server, application containers and data/service containers talk over Docker networks, not through public internet paths.

Typical pattern:
- app container connects to internal database/service over network alias
- only the app (or selected endpoints) is exposed through proxy routing
- stateful services keep data in volumes while remaining reachable internally

This setup is safer and easier to reason about than exposing every container publicly.


## Cloud and self-hosted responsibilities
Networking behavior is the same core model for self-hosted and Coolify Cloud users: your workloads run on your servers.

That means you are still responsible for:
- opening and restricting the right firewall ports
- DNS records and domain correctness
- upstream network policy at your provider
- any external load balancer, CDN, or WAF configuration

Coolify automates routing and wiring, but infrastructure-level networking security remains your responsibility.
