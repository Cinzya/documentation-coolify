---
title: "CrowdSec with Caddy"
description: "Protect your Coolify applications from malicious traffic using CrowdSec security engine with Caddy reverse proxy for real-time threat detection and blocking."
---

# CrowdSec with Caddy

This guide walks you through integrating [CrowdSec](https://www.crowdsec.net/?utm_source=coolify.io) with Caddy in Coolify. When configured, CrowdSec will automatically block malicious IPs, bots, and known attackers from accessing your applications.

::: tip Using Traefik instead?
If you're using the default Traefik proxy, see the [Traefik guide](/integrations/crowdsec/traefik) instead.
:::

## Architecture

The setup consists of three main components:

- **CrowdSec Engine:** Analyzes logs and detects malicious behavior
- **Caddy Bouncer:** A plugin that queries CrowdSec and blocks/allows requests
- **AppSec Component:** Provides WAF-like protection against common web attacks

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Visitor   │────▶│    Caddy    │────▶│    App      │
└─────────────┘     │  + Bouncer  │     └─────────────┘
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  CrowdSec   │
                    │   Engine    │
                    └─────────────┘
```

## Prerequisites

- Coolify with Caddy as the reverse proxy
- A Coolify destination configured (default works)
- Basic familiarity with Docker Compose

## 1. Deploy CrowdSec as a Service

Create a new service in Coolify using Docker Compose. This CrowdSec container will read Docker logs from all your containers to detect malicious behavior.

::: warning Important
Make sure the CrowdSec service is deployed to the **Coolify destination** (this is the default) so it can communicate with other containers on the `coolify` network.
:::

### Docker Compose Configuration

Navigate to your project and create a new service with the following Docker Compose:

```yaml
services:
  crowdsec:
    image: 'crowdsecurity/crowdsec:latest'
    container_name: crowdsec
    environment:
      COLLECTIONS: 'crowdsecurity/linux crowdsecurity/caddy crowdsecurity/appsec-generic-rules crowdsecurity/appsec-virtual-patching crowdsecurity/appsec-crs'
    volumes:
      - './config/acquis.yaml:/etc/crowdsec/acquis.yaml'
      - './config/crowdsec/docker.yaml:/etc/crowdsec/acquis.d/docker.yaml'
      - './crowdsec-db:/var/lib/crowdsec/data/'
      - './config:/etc/crowdsec/'
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
    networks:
      - coolify
    restart: unless-stopped

networks:
  coolify:
    external: true
```

### Understanding the Collections

The `COLLECTIONS` environment variable installs detection rules:

| Collection | Purpose |
|------------|---------|
| `crowdsecurity/linux` | Detects common Linux-based attacks (SSH brute force, etc.) |
| `crowdsecurity/caddy` | Parses and analyzes Caddy access logs |
| `crowdsecurity/appsec-generic-rules` | Generic application security rules |
| `crowdsecurity/appsec-virtual-patching` | Virtual patching for known CVEs |
| `crowdsecurity/appsec-crs` | OWASP Core Rule Set for WAF protection |

## 2. Configure Persistent Storage

In the **Storage** tab of your CrowdSec service, configure the following files:

### acquis.yaml

Create this as a **file** (not a directory). You can leave it empty or use it for additional acquisition sources later:

```yaml
# Additional acquisition sources can be added here
```

### docker.yaml

This file tells CrowdSec to read logs from Docker containers using labels:

```yaml
source: docker
use_container_labels: true
```

This configuration allows CrowdSec to automatically discover and monitor containers that have the appropriate labels set.

## 3. Get the Container Network Name

After deploying the CrowdSec service, you need to find its internal Docker network name to configure Caddy.

1. Open the CrowdSec service in Coolify
2. Click **Edit Docker Compose**
3. Look for the `COOLIFY_CONTAINER_NAME` or note the container name prefix

The container name will look something like: `crowdsec-yc8cow8wswgscg48ss88osgk`

This name is used as the internal DNS hostname within the Docker network.

## 4. Generate a Bouncer API Key

The Caddy bouncer needs an API key to communicate with CrowdSec. Generate one by opening the terminal for your CrowdSec container:

1. Go to your CrowdSec service in Coolify
2. Open the **Terminal** tab
3. Run the following command:

```bash
cscli bouncers add caddyBouncer
```

This will output an API key. **Save this key** – you'll need it in the next step.

Example output:
```
API key for 'caddyBouncer':

   ████████████████████████████████

Please keep this key since you will not be able to retrieve it!
```

## 5. Configure Caddy Dynamic Configuration

Now configure Caddy to use CrowdSec for request filtering. In Coolify:

1. Go to your **Server** → **Proxy** → **Dynamic Configurations**
2. Add a new Caddy configuration file
3. Name it starting with `0` (e.g., `0-crowdsec.caddy`) to ensure it loads first

::: tip File Ordering
Starting the filename with `0` ensures this configuration is loaded before other configurations, which is important for the CrowdSec middleware to work properly.
:::

### Caddy Configuration

```caddy
{
    servers {
        trusted_proxies static private_ranges
        trusted_proxies_strict
    }
    order crowdsec before respond
    crowdsec {
        api_url http://crowdsec-XXXXXXXXXXXXX:8080
        api_key "YOUR_API_KEY_FROM_STEP_4"
        ticker_interval 3s
        appsec_url http://crowdsec-XXXXXXXXXXXXX:7422
        #disable_streaming
        #enable_hard_fails
    }
    log {
        output stdout
    }
}
```

Replace:
- `crowdsec-XXXXXXXXXXXXX` with your actual CrowdSec container name from Step 3
- `YOUR_API_KEY_FROM_STEP_4` with the API key generated in Step 4

### Configuration Options Explained

| Option | Description |
|--------|-------------|
| `trusted_proxies static private_ranges` | Trusts private IP ranges for proxy headers |
| `trusted_proxies_strict` | Enforces strict proxy header validation |
| `order crowdsec before respond` | Ensures CrowdSec checks happen before responses |
| `api_url` | CrowdSec LAPI endpoint (port 8080) |
| `api_key` | Authentication key for the bouncer |
| `ticker_interval` | How often to sync decisions (3s is responsive) |
| `appsec_url` | AppSec/WAF component endpoint (port 7422) |

### Cloudflare Users

If you're behind Cloudflare, the real client IP is passed in specific headers. Add this to the `servers` block:

```caddy
{
    servers {
        client_ip_headers X-Forwarded-For Cf-Connecting-Ip
        trusted_proxies static private_ranges
        trusted_proxies_strict
    }
    # ... rest of config
}
```

Both `X-Forwarded-For` and `Cf-Connecting-Ip` headers contain the real client IP when using Cloudflare.

## 6. Enable CrowdSec on Applications

For each application you want to protect with CrowdSec, add these labels to enable log collection and protection:

### Adding Labels in Coolify

Go to your application's configuration and add these Docker labels:

```yaml
caddy_0.log.output=stdout
crowdsec.enable=true
crowdsec.labels.type=myapp
caddy_0.handle_path.crowdsec=
```

### Label Explanation

| Label | Purpose |
|-------|---------|
| `caddy_0.log.output=stdout` | Ensures Caddy logs are sent to stdout for CrowdSec to read |
| `crowdsec.enable=true` | Enables CrowdSec monitoring for this container |
| `crowdsec.labels.type=myapp` | Identifies the service type in CrowdSec (customize as needed) |
| `caddy_0.handle_path.crowdsec=` | Enables the CrowdSec handler for this route |

## 7. Verify the Setup

After completing all steps, verify that CrowdSec is working correctly.

### Check Acquisitions

Open the CrowdSec terminal and run:

```bash
cscli metrics show acquisition
```

This shows which log sources CrowdSec is monitoring and how many lines have been processed.

### Check Active Decisions (Blocked IPs)

```bash
cscli decisions list
```

This displays currently blocked IPs. Initially, this may be empty until attacks are detected.

### Check Bouncer Status

```bash
cscli bouncers list
```

You should see your `caddyBouncer` registered and connected.

## Troubleshooting

### CrowdSec Not Detecting Traffic

1. Verify the container labels are correctly set
2. Check that `docker.yaml` contains `use_container_labels: true`
3. Ensure your application containers have `crowdsec.enable=true`

### Bouncer Connection Failed

1. Verify the CrowdSec container name is correct in the Caddy config
2. Check the API key is properly quoted
3. Ensure both containers are on the `coolify` network

### Legitimate Traffic Being Blocked

If you need to whitelist an IP:

```bash
cscli decisions delete --ip YOUR_IP
cscli decisions add --ip YOUR_IP --type whitelist --duration 0
```

## Additional Resources

- [CrowdSec Documentation](https://doc.crowdsec.net/?utm_source=coolify.io)
- [CrowdSec Hub (Collections & Parsers)](https://hub.crowdsec.net/?utm_source=coolify.io)
- [Caddy CrowdSec Bouncer](https://github.com/hslatman/caddy-crowdsec-bouncer?utm_source=coolify.io)
- [CrowdSec Console (Cloud Dashboard)](https://app.crowdsec.net/?utm_source=coolify.io)

::: tip Pro Tip
Register for a free [CrowdSec Console](https://app.crowdsec.net/?utm_source=coolify.io) account to get a dashboard view of your security metrics and access additional blocklists.
:::
