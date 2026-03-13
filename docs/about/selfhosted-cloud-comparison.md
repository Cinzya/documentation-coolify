---
title: Self Hosted vs Coolify Cloud
description: A practical comparison of self-hosted Coolify and Coolify Cloud, so you can choose the right setup.
---

# Self Hosted vs Coolify Cloud
Both options run the same Coolify product experience, but they differ in who manages the Coolify instance.

The core difference is simple:
- **Self-hosted**: you run and maintain the Coolify instance yourself
- **Coolify Cloud**: the Coolify team runs and maintains the Coolify instance for you

In both models, you still connect and deploy applications to your own servers.


## High-level overview
Choose based on what you want to optimize for:
- **Self-hosted** if you want maximum control and full hands-on ownership
- **Coolify Cloud** if you want less operational overhead for the Coolify instance


## Quick comparison
| Area | Self-hosted Coolify | Coolify Cloud |
| :--- | :--- | :--- |
| Where Coolify runs | On your own infrastructure | On Coolify-managed infrastructure |
| Who manages Coolify instance | You | Coolify team |
| Who updates Coolify | You (you choose when to update) | Coolify team (managed rollout) |
| Coolify instance backups | Self-managed by you (can be automated) | Managed by Coolify team |
| Coolify dashboard access | Your own domain/setup | `app.coolify.io` |
| Notifications and alerts | You configure delivery (SMTP/Resend), then alerts are automated | Managed by Coolify team |
| Features available | Full feature set | Full feature set |
| Codebase | Open source | Open source |
| Future features | Included (free forever) | Included in subscription |
| Your application servers | Bring your own servers | Bring your own servers |
| Your app/database data location | Your servers/volumes | Your servers/volumes |
| Server-level security responsibility | You | You |
| Teams | Unlimited | Unlimited (additional subscription required per team) |
| Team members | Unlimited | Unlimited |
| Connected servers | Unlimited | Unlimited (additional subscription required per server) |
| Cost model | No Coolify license fee (your infrastructure costs still apply) | Paid managed service (see [pricing](https://coolify.io/pricing)) |


## Pricing details (Cloud)
Based on the current pricing page:
- **$5/month** base price (includes up to 2 connected servers)
- **+$3/month** for each additional connected server
- annual billing is available, check [pricing](https://coolify.io/pricing) for more info

Self-hosted remains free as software, but your own server/infrastructure costs still apply.

::: info Note
Pricing can change over time. Always verify latest details at [coolify.io/pricing](https://coolify.io/pricing).
:::


## What stays the same in both
No matter which option you choose:
- your apps, databases, and services run on your servers
- Docker/reverse-proxy based deployment model is the same
- there are no Cloud-only feature lock-ins
- you can deploy across one or multiple servers


## What changes between both
### Self-hosted
You are responsible for the full Coolify control plane lifecycle:
- installation
- upgrades
- backups of Coolify instance data
- availability and recovery planning

### Coolify Cloud
The Coolify team manages the Coolify control plane lifecycle for you:
- hosting and upgrades of the Coolify instance
- operational maintenance of that instance
- managed backups of the Coolify Cloud instance data

You still fully manage your own connected servers and workloads.


## Security and responsibility boundary
In both models, if you control a server or infrastructure component, securing it is your responsibility.

This includes:
- OS hardening and patching
- SSH key hygiene and access control
- firewall and exposed ports
- DNS and edge configuration
- workload backups and restore strategy

::: warning Important
Coolify Cloud manages the Coolify instance, not your entire infrastructure.
Your application data and runtime security on connected servers remain your responsibility.
:::


## Which should you choose?
- Choose **Self-hosted** if you want full operational ownership of the Coolify instance.
- Choose **Coolify Cloud** if you want the same product experience with less control-plane maintenance.

If your priority is speed and lower maintenance for the platform itself, Cloud is usually the easier path.
If your priority is full control of every layer, self-hosted is usually the better fit.
