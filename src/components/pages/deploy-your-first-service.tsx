'use client';

import {
  Box2,
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
import { CoolCallout } from '@/components/docs/cool-callout';
import { CoolFlow } from '@/components/docs/cool-flow';
import {
  FirstDeployCardGrid,
  FirstDeployChoiceGrid,
  FirstDeployNextSteps,
  openFirstDeployIssueTab,
} from '@/components/docs/first-deploy-sections';

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
    <FirstDeployCardGrid cards={prerequisiteCards} dataAttribute="data-first-service" />
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
      <FirstDeployChoiceGrid
        choices={[
          {
            title: 'Fastest first test',
            code: 'http://<uuid>.<server-ip>.sslip.io:3000',
            points: [
              'Keep :3000 in the Coolify URL configuration.',
              'Visit the URL without :3000 in your browser.',
              'Use this only to confirm the service and proxy work.',
            ],
          },
          {
            title: 'Production-style test',
            code: 'https://analytics.example.com:3000',
            points: [
              'Point DNS to your server IP address.',
              'Keep :3000 in the Coolify URL configuration.',
              'Visit https://analytics.example.com in your browser.',
            ],
          },
        ]}
      />
    </CoolCallout>
  );
}

export function FirstServiceTroubleshooting() {
  return (
    <FirstDeployCardGrid
      cards={issueCards}
      onCardClick={(event, issue) => openFirstDeployIssueTab(event, 'first-service-issues', issue.title)}
      dataAttribute="data-first-service"
    />
  );
}

export function FirstServiceNextSteps() {
  return (
    <FirstDeployNextSteps steps={nextSteps} dataAttribute="data-first-service" />
  );
}
