'use client';

import type React from 'react';
import {
  ArrowRight,
  Box2,
  BrowserTerminal,
  Check,
  Database,
  Key2,
  Plug2,
  Rocket2,
  Server,
  Settings,
  ShieldAlert,
  TerminalSquare,
  Warning22,
  WindowPointer,
} from 'reicon-react';
import { CoolActionCard } from '@/components/docs/cool-action-card';
import { CoolActionCardGrid } from '@/components/docs/cool-action-card-grid';
import { CoolCallout } from '@/components/docs/cool-callout';
import { CoolFlow } from '@/components/docs/cool-flow';

const databaseDeploymentFlow = {
  checklist: [
    'Create or open the project where the database will live.',
    'Choose Redis from the database resources list.',
    'Map a temporary host port for terminal testing.',
    'Open the mapped host port in your firewall rules.',
    'Deploy Redis and copy the generated password.',
    'Run PING from redis-cli and confirm Redis returns PONG.',
  ],
  steps: ['Create or open a project', 'Choose Redis', 'Map host port', 'Open firewall', 'Deploy Redis', 'Test with redis-cli'],
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
    title: 'Terminal ready',
    description: 'You can run a command from your computer to test Redis.',
    bullets: ['Use redis-cli if installed', 'Use Docker if redis-cli is not installed'],
    icon: TerminalSquare,
  },
];

const issueCards = [
  {
    title: 'Connection refused',
    description: 'Usually means Redis is not reachable on the mapped host port.',
    href: '#first-database-issues',
    icon: Plug2,
  },
  {
    title: 'Auth failed',
    description: 'Usually means the password does not match the value in Coolify.',
    href: '#first-database-issues',
    icon: Key2,
  },
  {
    title: 'redis-cli missing',
    description: 'Use a temporary Redis container when redis-cli is not installed.',
    href: '#first-database-issues',
    icon: BrowserTerminal,
  },
];

const nextSteps = [
  {
    title: 'Deploy an app',
    detail: 'Deploy an application that can connect to a database.',
    href: '/deploy-your-first-app',
    icon: Rocket2,
  },
  {
    title: 'Deploy a service',
    detail: 'Deploy a ready-made service from the Coolify catalog.',
    href: '/deploy-your-first-service',
    icon: Settings,
  },
  {
    title: 'Learn databases',
    detail: 'Learn how Coolify manages database resources, passwords, and backups.',
    href: '/databases/index',
    icon: Database,
  },
];

export function FirstDatabasePrerequisites() {
  return (
    <CoolActionCardGrid data-first-database className="not-prose my-5">
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

export function FirstDatabaseDeploymentFlow() {
  return (
    <section data-first-database className="not-prose my-5">
      <CoolFlow
        checklist={databaseDeploymentFlow.checklist}
        icon={Database}
        id="first-database-deployment-flow"
        result="You should end with a running Redis container, a mapped host port allowed by your firewall, a Redis password, and a successful PONG response."
        steps={databaseDeploymentFlow.steps}
        summary="This first database deployment uses Redis because it is lightweight, quick to deploy, and easy to test from your terminal."
        title="First database deployment flow"
      />
    </section>
  );
}

export function FirstDatabasePortMapping() {
  return (
    <CoolCallout data-first-database className="not-prose my-5 overflow-hidden" contentClassName="!p-0" id="redis-port-mapping" icon={Plug2} title="Redis port mapping">
      <div className="grid gap-0 md:grid-cols-2">
        <PortMappingSide
          title="Host port"
          code="6380"
          points={[
            'This is the server port you connect to from your terminal.',
            'Choose another free host port if 6380 is already used.',
          ]}
        />
        <PortMappingSide
          title="Container port"
          code="6379"
          points={[
            'This is the Redis port inside the container.',
            'Keep this side as 6379 for this guide.',
          ]}
        />
      </div>
    </CoolCallout>
  );
}

export function FirstDatabaseExposureWarning() {
  return (
    <CoolCallout data-first-database className="not-prose my-5" id="database-port-warning" icon={ShieldAlert} title="Do not expose databases casually">
      Exposing a database port publicly is risky in production. This guide maps a Redis port only so you can test the first deployment from your terminal.
      For real production workloads, keep databases private unless you have a specific reason and strict network controls.
    </CoolCallout>
  );
}

export function FirstDatabaseTroubleshooting() {
  return (
    <CoolActionCardGrid data-first-database className="not-prose my-5">
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-3">
        {issueCards.map((issue) => (
          <CoolActionCard
            key={issue.title}
            href={issue.href}
            onClick={(event) => openDatabaseIssueTab(event, issue.title)}
            title={issue.title}
            description={issue.description}
            icon={issue.icon}
          />
        ))}
      </div>
    </CoolActionCardGrid>
  );
}

export function FirstDatabaseNextSteps() {
  return (
    <section data-first-database data-cool-docs className="not-prose my-6 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
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

function openDatabaseIssueTab(event: React.MouseEvent<HTMLAnchorElement>, value: string) {
  event.preventDefault();

  window.dispatchEvent(
    new CustomEvent('mdx-tabs:set-active', {
      detail: {
        id: 'first-database-issues',
        value,
      },
    }),
  );

  document.getElementById('first-database-issues')?.scrollIntoView({ block: 'start' });
  window.history.pushState(null, '', '#first-database-issues');
}

function PortMappingSide({ code, points, title }: { code: string; points: string[]; title: string }) {
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
