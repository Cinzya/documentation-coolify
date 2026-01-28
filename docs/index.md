---
title: Home
description: Welcome to Coolify Documentation
---

# Build & deploy with Coolify
Your handbook to owning and operating your infrastructure with Coolify.

## Get started
Set up Coolify and deploy your first app in minutes.

<CardGroup :cards="quickStartCards" :cols="2" />

## Deploy any language. Any framework.
If it runs in Docker, you can deploy it with Coolify.

<CardGroup :cards="frameworkCards" :cols="2" />

[View all language and framework guides](http://localhost)

## Deploy any database
If it runs in Docker, you can deploy it with Coolify.

<CardGroup :cards="databaseCards" :cols="2" />

[View all database guides](http://localhost)

## Deploy any service
Run **200+** open-source software with our **single click** service templates

<CardGroup :cards="servicesCards" :cols="2" />

[View all service templates](http://localhost)

## Help & Support
Get help from the community and the Coolify team.

<CardGroup :cards="supportCards" :cols="2" />


<script setup>
const quickStartCards = [
  {
    title: 'Quick start',
    image: '/docs/images/home/quick-start.webp',
    link: '/get-started/introduction'
  },
  {
    title: 'Deploy your first application',
    image: '/docs/images/home/deploy-first-application.webp',
    link: '/get-started/installation'
  },
  {
    title: 'API',
    image: '/docs/images/home/api.webp',
    link: '/applications/'
  },
  {
    title: 'CLI',
    image: '/docs/images/home/cli.webp',
    link: '/services/overview'
  }
]

const frameworkCards = [
  {
    title: 'Laravel',
    image: '/docs/images/home/laravel.webp',
    link: '/applications/nuxt'
  },
  {
    title: 'Next.js',
    image: '/docs/images/home/nextjs.webp',
    link: '/applications/nextjs'
  },
  {
    title: 'Django',
    image: '/docs/images/home/django.webp',
    link: '/applications/laravel'
  },
  {
    title: 'Ruby on Rails',
    image: '/docs/images/home/rails.webp',
    link: '/applications/laravel'
  }
]

const databaseCards = [
  {
    title: 'PostgreSQL',
    image: '/docs/images/home/postgres.webp',
    link: '/applications/nuxt'
  },
  {
    title: 'MySQL',
    image: '/docs/images/home/mysql.webp',
    link: '/applications/laravel'
  },
  {
    title: 'Redis',
    image: '/docs/images/home/redis.webp',
    link: '/applications/nextjs'
  },
  {
    title: 'MongoDB',
    image: '/docs/images/home/mongodb.webp',
    link: '/applications/laravel'
  }
]

const servicesCards = [
  {
    title: 'n8n',
    image: '/docs/images/home/n8n.webp',
    link: '/applications/nuxt'
  },
  {
    title: 'Strapi',
    image: '/docs/images/home/strapi.webp',
    link: '/applications/nextjs'
  },
  {
    title: 'Convex',
    image: '/docs/images/home/convex.webp',
    link: '/applications/laravel'
  },
  {
    title: 'WordPress',
    image: '/docs/images/home/wordpress.webp',
    link: '/applications/laravel'
  }
]

const supportCards = [
  {
    title: 'Discord community',
    image: '/docs/images/home/discord-community.webp',
    link: '/applications/nextjs'
  },
  {
    title: 'Github discussions',
    image: '/docs/images/home/github-discussions.webp',
    link: '/applications/nuxt'
  },
  {
    title: 'Email',
    image: '/docs/images/home/email.webp',
    link: '/applications/laravel'
  }
]
</script>