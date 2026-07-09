'use client';

import {
  Box2,
  BrowserTerminal,
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
import { CoolCallout } from '@/components/docs/cool-callout';
import {
  FirstDeployCardGrid,
  FirstDeployChoiceGrid,
  FirstDeployNextSteps,
  openFirstDeployIssueTab,
} from '@/components/docs/first-deploy-sections';

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
    <FirstDeployCardGrid cards={prerequisiteCards} dataAttribute="data-first-database" />
  );
}

export function FirstDatabasePortMapping() {
  return (
    <CoolCallout data-first-database className="not-prose my-5 overflow-hidden" contentClassName="!p-0" id="redis-port-mapping" icon={Plug2} title="Redis port mapping">
      <FirstDeployChoiceGrid
        choices={[
          {
            title: 'Host port',
            code: '6380',
            points: [
              'This is the server port you connect to from your terminal.',
              'Choose another free host port if 6380 is already used.',
            ],
          },
          {
            title: 'Container port',
            code: '6379',
            points: [
              'This is the Redis port inside the container.',
              'Keep this side as 6379 for this guide.',
            ],
          },
        ]}
      />
    </CoolCallout>
  );
}

export function FirstDatabaseExposureWarning() {
  return (
    <CoolCallout data-first-database className="not-prose my-5" id="database-port-warning" icon={ShieldAlert} title="Do not expose databases casually" type="warn">
      Exposing a database port publicly is risky in production. This guide maps a Redis port only so you can test the first deployment from your terminal.
      For real production workloads, keep databases private unless you have a specific reason and strict network controls.
    </CoolCallout>
  );
}

export function FirstDatabaseTroubleshooting() {
  return (
    <FirstDeployCardGrid
      cards={issueCards}
      onCardClick={(event, issue) => openFirstDeployIssueTab(event, 'first-database-issues', issue.title)}
      dataAttribute="data-first-database"
    />
  );
}

export function FirstDatabaseNextSteps() {
  return (
    <FirstDeployNextSteps steps={nextSteps} dataAttribute="data-first-database" />
  );
}
