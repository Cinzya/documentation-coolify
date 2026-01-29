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
- **Buildpacks** – automatic detection (Nixpacks)

::: info Note
Images are cached and reused. Builds only run when the source changes, keeping deployments fast and efficient.
:::

Once built, the resulting Docker image is treated like any other image and can be reused, redeployed, or pushed to any docker registry.

---

### Deployment process
When deploying an application, Coolify orchestrates container replacement on the target server:

1. Pull or use the newly built Docker image
2. Create new containers with the updated configuration
3. Inject environment variables and secrets
4. Attach persistent Docker volumes
5. Update the local reverse proxy routing
6. Stop old containers once the new ones are ready

If a deployment fails, the existing containers remain running.

Coolify never removes a working application until a new one is successfully started.

::: tip Near zero-downtime deployments
When health checks are configured, Coolify can perform rolling deployments where traffic is only switched after the new container becomes healthy.
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

This gurantees your data stays **portable, durable, and fully under your control**, independent of Coolify.