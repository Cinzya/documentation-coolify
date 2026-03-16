---
title: Deploy your first app
description: Deploy your first application on Coolify using the Docker Image option with a simple nginx example.
---

# Deploy your first app
Deploying your first app in Coolify is the quickest way to confirm your setup is working end-to-end.

In this guide, you will deploy an **Nginx** app using the **Docker Image** option.

This path is ideal for a first deployment because:
- no Git repository is required
- no build configuration is required
- you can validate deployment, routing, and access in minutes

## Before you start
Make sure:
- Coolify is installed and accessible
- you have at least one connected server in Coolify (if you are self-hosting, you can use the same server where Coolify runs which will be `localhost`)
- your server allows inbound traffic on ports `80` and `443`

If you are not ready yet, first follow:
- [Start with Self-hosted](/get-started/start-with-self-hosted)
- [Start with Coolify Cloud](/get-started/start-with-cloud)


## Deploy your first nginx app

### 1. Check if Coolify proxy is running
On the Coolify dashboard:
- click **Servers** on the left sidebar
- click on your server name
- check if it says **Proxy is running**

<ZoomableImage src="shadow-to-do" alt="Proxy status in Coolify" />

If it says **Proxy is stopped**, click **Start Proxy**.

---

### 2. Create your first project

On the Coolify dashboard:
- click **New Project**
- enter a project name (example: `my-first-project`)
- click **Continue**

<ZoomableImage src="shadow-to-do" alt="Create a project in Coolify" />

::: tip Tip
If you already have a project, skip this step and continue to Step 3.
:::

---

### 3. Create a new resource
Open your project and click **Create New Resource**.

<ZoomableImage src="shadow-to-do" alt="Create new resource in a Coolify project" />

---

### 4. Choose deployment type
From the deployment options, choose **Docker Image**.

<ZoomableImage src="shadow-to-do" alt="Choose Docker Image deployment option" />

This option is for pre-built images, so Coolify will pull the image from a container registry and run it directly.

---

### 5. Enter the image reference
In the image field, enter:

```js
nginx:alpine
```

Then continue to the configuration screen.

<ZoomableImage src="shadow-to-do" alt="Enter nginx alpine image name" />

---

### 6. Configure network settings
Set:
- **Ports Exposes**: `80`

By default, Coolify generates a testing domain in this format:
- `http://<uuid>.<server-ip>.sslip.io`

<ZoomableImage src="shadow-to-do" alt="Set exposed port and optional domain" />

This means you can deploy immediately and open the generated URL in your browser without any DNS setup.

If you want to use your own domain instead:
- point your domain DNS to your server IP address
- replace the generated domain with your own domain in Coolify
- use `https://` while entering the domain in Coolify so TLS certificates can be issued and used correctly (example: `https://example.com`)

::: info Note
For first deployment testing, using the generated `sslip.io` domain is the fastest path.
:::

---

### 7. Deploy
Click the **Deploy** button.

<ZoomableImage src="shadow-to-do" alt="Start deployment for docker image resource" />

During deployment, Coolify will:
- pull `nginx:alpine` from Docker Hub
- create and start the container
- connect it to proxy/network routing

---

### 8. Visit application link
After deployment completes:
- visit the application URL
- you should see the default Nginx welcome page

<ZoomableImage src="shadow-to-do" alt="Set exposed port and optional domain" />

Congrats you have successfully deployed your first application using Coolify!


## Common first-deploy issues
### 1. Application link shows "No Available Server"
Usually caused by wrong port settings.

Check:
- application listens on the port set in **Ports Exposes**
- for this guide, it must be `80`

### 2. Application link does not open
Check:
- DNS record points to your server IP (if using your own domain)
- server firewall allows port `80` and `443`
- Coolify proxy is running (follow [step 1](#_1-check-if-coolify-proxy-is-running))

### 3. Browser shows site not secure
This can happen if you are using the auto-generated `sslip.io` domain, because TLS certificates issuance for shared/testing domains can be rate-limited.

If you are using your own domain, make sure:
- DNS is pointed correctly to your server IP
- the domain is added in Coolify with `https://` so it will be like `https://example.com`


## What to do next
- [Learn build packs available on Coolify](/applications/build-packs/overview)
- [Deploy your first database](/get-started/deploy-your-first-database)
- [Deploy your first service](/get-started/deploy-your-first-service)
