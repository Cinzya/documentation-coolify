---
title: "CrowdSec"
description: "Protect your Coolify applications from malicious traffic using CrowdSec security engine for real-time threat detection and automatic IP blocking."
---

# CrowdSec

[CrowdSec](https://www.crowdsec.net/?utm_source=coolify.io) is a free, open-source security engine that analyzes visitor behavior and provides an adaptive response to attacks. It acts as a collaborative intrusion prevention system, sharing threat intelligence across its community of users.

## Why Use CrowdSec?

- **Community-Driven Threat Intelligence:** CrowdSec shares threat signals across its community, meaning you benefit from the collective intelligence of thousands of users.
- **Real-Time Protection:** Blocks malicious traffic before it reaches your applications.
- **Application Security (AppSec):** Includes Web Application Firewall (WAF) capabilities with virtual patching.
- **Low Resource Usage:** Lightweight and efficient, suitable for any server size.
- **Privacy-Focused:** Only shares attack metadata, never your actual traffic data.

## Ways to Use CrowdSec with Coolify

You can integrate CrowdSec with Coolify depending on which reverse proxy you're using:

1. [Caddy](/integrations/crowdsec/caddy) → Deploy CrowdSec with the Caddy bouncer plugin for Layer 7 protection.

2. [Traefik](https://www.crowdsec.net/blog/securing-automated-app-deployment-crowdsec-and-coolify?utm_source=coolify.io) → Official guide from CrowdSec covering firewall remediation and Traefik bouncer setup.

## Architecture Overview

CrowdSec works by analyzing logs from your applications and proxy, detecting malicious patterns, and then instructing "bouncers" to block bad actors:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Visitor   │────▶│   Proxy     │────▶│    App      │
└─────────────┘     │  + Bouncer  │     └─────────────┘
                    └──────┬──────┘
                           │ queries/blocks
                    ┌──────▼──────┐
                    │  CrowdSec   │◀──── Community
                    │   Engine    │      Blocklists
                    └──────┬──────┘
                           │ reads logs
                    ┌──────▼──────┐
                    │   Docker    │
                    │    Logs     │
                    └─────────────┘
```

## Additional Resources

- [CrowdSec Documentation](https://doc.crowdsec.net/?utm_source=coolify.io)
- [CrowdSec Hub (Collections & Parsers)](https://hub.crowdsec.net/?utm_source=coolify.io)
- [CrowdSec Console (Free Cloud Dashboard)](https://app.crowdsec.net/?utm_source=coolify.io)
