---
title: Security Model
description: A practical overview of what Coolify secures, and what you must secure yourself.
---

# Security model
Coolify helps with application-level security controls, but **server security is fully your responsibility**.

This applies to both self-hosted and Coolify Cloud users (because your own servers are still connected and managed by you).

You are responsible for securing:
- the host operating system
- SSH access and key management
- firewall and open ports
- reverse proxy and DNS setup
- backup handling and secret storage
- server patching and incident response

This page explains the security model in practical terms, especially if you are new to self-hosting.


## High-level overview
Coolify's security model is built around these principles:
- **Access control** for users and API tokens
- **Encrypted storage** for many sensitive values
- **Authenticated automation** for API and webhooks
- **Standard Docker isolation** for workloads

## Security boundary
| Area | Coolify responsibility | Your responsibility |
| :--- | :--- | :--- |
| Dashboard and API authentication | Provides auth flows, token checks, and permission enforcement | Enforce strong user practices (2FA, secure credentials, access hygiene) |
| Application secret handling | Encrypts many sensitive values in the platform | Protect environment files, backups, snapshots, and any exported secrets |
| Deploy orchestration | Validates and executes deployment flows safely | Review what you deploy, and secure the target servers |
| Server operating system | Not managed by Coolify | Patch OS, harden SSH, configure firewall, and monitor host security |
| Network edge and DNS | Provides proxy automation features | Secure DNS, TLS posture, exposed ports, and provider/network controls |
| Infrastructure ownership | Provides platform controls | Secure every server and service you control (self-hosted or Coolify Cloud) |
| Backups and restore | Provides backup orchestration features | Encrypt backups, define retention, test restores, and control backup access |
| Incident response and monitoring | Provides platform-level alerts and health signals | Set up alerts, host monitoring, and incident response processes |
| Third-party integrations (Git/OAuth/Webhooks) | Provides integration flows and verification checks | Rotate secrets, limit provider permissions, and review integration scope regularly |


## Core areas
1. [Identity and access](#identity-and-access)
2. [API and token security](#api-and-token-security)
3. [Secrets and sensitive data handling](#secrets-and-sensitive-data-handling)
4. [Server access model](#server-access-model)
5. [Deployment and webhook safeguards](#deployment-and-webhook-safeguards)
6. [Network and traffic security](#network-and-traffic-security)

---

### Identity and access
Built-in controls include:
- email/password authentication 
- optional OAuth-based login providers
- optional two-factor authentication
- route/session protections for dashboard access
- rate limiting on sensitive auth flows

Authorization is role and policy based:
- team roles like owner/admin/member
- resource policies for servers, applications, databases, keys, tokens, etc.
- terminal access restricted to elevated roles

---

### API and token security
The API is protected with token authentication and scoped abilities.

In practice this means:
- API routes require authenticated tokens
- token permissions are limited to the supported ability set (`read`, `read:sensitive`, `deploy`, `root`)
- high-risk actions can be separated from read-only access
- sensitive API data exposure can be gated by extra permissions

---

### Secrets and sensitive data handling
Coolify stores many sensitive fields encrypted at rest (for example):
- SSH private keys
- environment variable values
- cloud provider tokens
- database credentials
- webhook URLs/tokens and several notification secrets
- selected app/server/instance security fields

Additional protections:
- private keys are validated before save
- many credential patterns are redacted in logs

::: warning Important
For self-hosted setups, protect your `.env`, backups, and database snapshots as sensitive assets.

For Coolify Cloud, secrets are stored in the Coolify Cloud database, operational access is restricted to the founder, and user application data is not accessed.
:::

---

### Server access model
Coolify manages servers over SSH.

Key points:
- no mandatory persistent deployment agent is required
- commands are executed remotely over SSH when needed
- `coolify-sentinel` is the monitoring component and runs as a separate container when enabled
- non-root users can still be supported through controlled command elevation

This keeps managed servers operational outside of Coolify.

---

### Deployment and webhook safeguards
Coolify includes guardrails for automation inputs and deployment triggers.

Key points:
- webhook endpoints validate provider signatures/tokens before queuing deployments
- Docker Compose parsing includes command-injection safety validation
- path and command-related inputs are validated before execution
- deployment pipelines can enforce health checks before traffic is switched

These controls reduce accidental and malicious unsafe input reaching runtime commands.

---

### Network and traffic security
Coolify follows a distributed traffic model:
- apps run on your managed servers
- each server can run its own proxy layer (Traefik/Caddy)
- TLS termination and certificate automation are handled at the server edge

Platform-side middleware also handles:
- trusted host/proxy behavior
- secure cookie behavior when behind HTTPS proxies


## Your responsibility as user
If you have access to a server or infrastructure component, securing it is your responsibility in both self-hosted and Coolify Cloud setups.

You should:
- harden your host OS and keep it patched
- secure SSH (keys, restricted access, no unnecessary exposure)
- keep only required ports open
- protect and rotate keys/tokens/secrets
- secure backups and disaster recovery workflows
- monitor system and application activity

::: info NOTE
Coolify provides security controls at the platform layer, but it does not replace your responsibility to secure any system you control.
:::
