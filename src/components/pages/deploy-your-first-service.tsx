'use client';

import type React from 'react';
import {
  ArrowRight,
  Box2,
  Check,
  Database,
  Globe3,
  Key2,
  Rocket2,
  Server,
  Settings,
  SignalStream,
  Warning22,
  WindowPointer,
} from 'reicon-react';
import { CoolActionCard } from '@/components/docs/cool-action-card';
import { CoolActionCardGrid } from '@/components/docs/cool-action-card-grid';
import { CoolCallout } from '@/components/docs/cool-callout';
import { CoolFlow } from '@/components/docs/cool-flow';

const serviceDeploymentFlow = {
  checklist: [
    'Create or open the project where the service will live.',
    'Choose Umami from the service resources list.',
    'Keep the service port in the Coolify URL configuration.',
    'Deploy Umami and wait for the containers to start.',
    'Open the public URL without the port and sign in.',
  ],
  steps: ['Create or open a project', 'Choose Umami', 'Review service URL', 'Deploy service', 'Open the URL and sign in'],
};

const prerequisiteCards = [
  {
    title: 'Dashboard access',
    description: 'You can sign in to Coolify and see the main dashboard.',
    bullets: ['You can access Coolify in your browser', 'Dashboard loads without errors'],
    icon: WindowPointer,
  },
  {
    title: 'Server is connected',
    description: 'Coolify has at least one server listed on the Servers page.',
    bullets: ['Open Servers from the sidebar', 'For self-hosted installs, localhost is fine'],
    icon: Server,
  },
  {
    title: 'Proxy is running',
    description: 'Services need the proxy to route the generated URL to the right container.',
    bullets: ['Open the server page', 'Start the proxy if it is stopped'],
    icon: SignalStream,
  },
];

const issueCards = [
  {
    title: "Link doesn't open",
    description: 'Usually means DNS, firewall, or proxy routing is not ready.',
    href: '#first-service-issues',
    icon: SignalStream,
  },
  {
    title: 'Login fails',
    description: 'Usually means the login details are wrong.',
    href: '#first-service-issues',
    icon: Key2,
  },
  {
    title: 'Site not secure',
    description: 'sslip.io can be rate-limited. Use a real domain for TLS.',
    href: '#first-service-issues',
    icon: Warning22,
  },
];

const nextSteps = [
  {
    title: 'Deploy an app',
    detail: 'Deploy an application when you want to run your own image or code.',
    href: '/deploy-your-first-app',
    icon: Rocket2,
  },
  {
    title: 'Deploy a database',
    detail: 'Deploy a database when your app or service needs persistent data.',
    href: '/deploy-your-first-database',
    icon: Database,
  },
  {
    title: 'Explore services',
    detail: 'Browse the one-click service catalog and deploy another resource.',
    href: '/services/all',
    icon: Box2,
  },
];

export function FirstServicePrerequisites() {
  return (
    <CoolActionCardGrid data-first-service className="not-prose my-5">
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-3">
        {prerequisiteCards.map((card) => (
          <CoolActionCard
            key={card.title}
            title={card.title}
            description={card.description}
            bullets={card.bullets}
            icon={card.icon}
          />
        ))}
      </div>
    </CoolActionCardGrid>
  );
}

export function FirstServiceDeploymentFlow() {
  return (
    <section data-first-service className="not-prose my-5">
      <CoolFlow
        checklist={serviceDeploymentFlow.checklist}
        icon={Settings}
        id="first-service-deployment-flow"
        result="You should end with running Umami containers, a generated service URL, and a successful login page."
        steps={serviceDeploymentFlow.steps}
        summary="This first service deployment uses Umami because it is a ready-made one-click service with a clear browser check after deployment."
        title="First service deployment flow"
      />
    </section>
  );
}

export function FirstServiceNetworkChoices() {
  return (
    <CoolCallout data-first-service className="not-prose my-5 overflow-hidden" contentClassName="!p-0" id="first-service-url" icon={Globe3} title="Generated URL or your own domain">
      <div className="grid gap-0 md:grid-cols-2">
        <ServiceUrlChoice
          title="Fastest first test"
          code="http://<uuid>.<server-ip>.sslip.io:3000"
          points={[
            'Keep :3000 in the Coolify URL configuration.',
            'Visit the URL without :3000 in your browser.',
            'Use this only to confirm the service and proxy work.',
          ]}
        />
        <ServiceUrlChoice
          title="Production-style test"
          code="https://analytics.example.com:3000"
          points={[
            'Point DNS to your server IP address.',
            'Keep :3000 in the Coolify URL configuration.',
            'Visit https://analytics.example.com in your browser.',
          ]}
        />
      </div>
    </CoolCallout>
  );
}

export function FirstServiceTroubleshooting() {
  return (
    <CoolActionCardGrid data-first-service className="not-prose my-5">
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-3">
        {issueCards.map((issue) => (
          <CoolActionCard
            key={issue.title}
            href={issue.href}
            onClick={(event) => openServiceIssueTab(event, issue.title)}
            title={issue.title}
            description={issue.description}
            icon={issue.icon}
          />
        ))}
      </div>
    </CoolActionCardGrid>
  );
}

export function FirstServiceNextSteps() {
  return (
    <section data-first-service data-cool-docs className="not-prose my-6 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
        {nextSteps.map((step) => {
          const Icon = step.icon;

          return (
            <a
              key={step.title}
              href={step.href}
              className="method-card method-card-primary group rounded-lg border border-fd-border bg-fd-muted/20 p-4 shadow-sm transition duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-fd-border bg-fd-background text-fd-foreground">
                    <Icon className="size-5" weight="Filled" aria-hidden={true} />
                  </span>
                  <h3 className="m-0 text-sm font-semibold text-fd-foreground">{step.title}</h3>
                </div>
                <ArrowRight
                  className="mt-2 size-4 shrink-0 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-fd-foreground"
                  aria-hidden="true"
                />
              </div>
              <p className="m-0 mt-3 text-sm leading-6 text-fd-muted-foreground">{step.detail}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function openServiceIssueTab(event: React.MouseEvent<HTMLAnchorElement>, value: string) {
  event.preventDefault();

  window.dispatchEvent(
    new CustomEvent('mdx-tabs:set-active', {
      detail: {
        id: 'first-service-issues',
        value,
      },
    }),
  );

  document.getElementById('first-service-issues')?.scrollIntoView({ block: 'start' });
  window.history.pushState(null, '', '#first-service-issues');
}

function ServiceUrlChoice({ code, points, title }: { code: string; points: string[]; title: string }) {
  return (
    <div className="border-b border-fd-border p-4 last:border-b-0 sm:p-5 md:border-b-0 md:border-e md:last:border-e-0">
      <h3 className="m-0 text-sm font-semibold text-fd-foreground">{title}</h3>
      <code className="mt-3 block rounded-md border border-fd-border bg-fd-muted px-3 py-2 text-xs font-semibold text-fd-foreground">
        {code}
      </code>
      <ul className="m-0 mt-4 space-y-2 p-0">
        {points.map((point) => (
          <li key={point} className="flex gap-2 text-sm leading-6 text-fd-muted-foreground">
            <Check className="mt-1 size-4 shrink-0 text-fd-foreground" aria-hidden={true} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
