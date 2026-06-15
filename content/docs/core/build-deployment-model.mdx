---
title: Build and Deployment Model
description: How Coolify builds and deploys applications using Docker, without traditional CI/CD complexity.
---

# Build and deployment model
Coolify provides a **simple, predictable build and deployment model** on top of Docker. 

It turns source code or container images into running applications on your own servers, without requiring external CI/CD pipelines or managed cloud services.

The goal is to give you:
- Automated builds
- Safe, repeatable deployments
- Persistent data
- Full control over the infrastructure

All while keeping applications **independent of Coolify itself**.


## High-level overview
Coolify follows a clear **build → deploy → run** lifecycle.

At a high level:
- You connect **source code or images** to Coolify
- Docker images are **built automatically** when needed
- Containers are **deployed and replaced safely**
- Persistent data **survives every deployment**
- Applications run **directly on your servers**

Because everything is built on standard Docker primitives, applications continue running even if Coolify is removed.

## Core phases
1. [Source configuration](#source-configuration)
2. [Build process](#build-process)
3. [Deployment process](#deployment-process)
4. [Runtime management](#runtime-management)

---

### Source configuration
The **source configuration** defines what Coolify should deploy and how.

You can connect an application using:
- **Git repositories** – GitHub, GitLab, Bitbucket, or self-hosted Git
- **Prebuilt Docker images** – from any container registry

This configuration is stored in the Coolify control plane and acts as the **single source of truth** for the application.

---

### Build process
If an application requires a build step, Coolify automatically builds a Docker image.

Builds can run:
- **On the target server** – simplest and most common setup
- **On a dedicated build server** – optional, for resource isolation

Coolify uses standard Docker tooling and supports:
- **Dockerfiles** – full control over the build process
- **Prebuilt Docker images** – no build step, direct deploy
- **Docker Compose builds** – service-based application builds
- **Buildpacks** – automatic detection (Nixpacks, static, etc.)

::: info Note
Images are cached and reused.  
Builds are skipped when Coolify can reuse an existing image for the same commit and configuration.
:::

Once built, the resulting Docker image is treated like any other image and can be reused and redeployed.  
If a Docker registry is configured, Coolify can also push the built image there.

---

### Deployment process
When deploying an application, Coolify orchestrates container replacement on the target server:

1. Pull or use the newly built Docker image
2. Create new containers with the updated configuration
3. Inject environment variables and secrets
4. Attach persistent Docker volumes
5. Update the local reverse proxy routing
6. Stop old containers once the new ones are ready

Coolify runs the build while your current application keeps running.
If the build or deployment fails, your currently running application is not replaced.
If the build passes, Coolify swaps containers to move traffic to the new version.

::: tip Near zero-downtime deployments
When health checks are configured and rolling deployment conditions are met, Coolify can perform rolling deployments where traffic is switched only after the new container becomes healthy.
:::

---

### Runtime management
After deployment, applications run as **normal Docker containers** on your servers.

Coolify provides lightweight runtime controls on dashboard:

- real-time container logs
- start, stop, and restart actions
- command execution inside containers
- basic resource usage visibility


## Databases and persistent storage
Databases and stateful services are treated as **first-class Docker workloads**.

Key principles:
- Data is stored in **Docker volumes on your servers**
- Redeployments never delete or reset data
- Containers can be replaced safely at any time
- Volumes remain usable outside of Coolify

Coolify also supports:
- Automated database backups
- S3-compatible storage targets

This guarantees your data stays **portable, durable, and fully under your control**, independent of Coolify.
