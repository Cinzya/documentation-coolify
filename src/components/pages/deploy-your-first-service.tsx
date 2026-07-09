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
import { CoolCompare, CoolCompareColumn } from '@/components/docs/cool-compare';
import {
  FirstDeployCardGrid,
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

export function FirstServiceNetworkChoices() {
  return (
    <CoolCompare
      data-first-service
      className="not-prose my-5"
      id="first-service-url"
      icon={Globe3}
      title="Generated URL or your own domain"
    >
      <CoolCompareColumn
        title="Fastest first test"
        code="http://<uuid>.<server-ip>.sslip.io:3000"
        items={[
          'Keep :3000 in the Coolify URL configuration.',
          'Visit the URL without :3000 in your browser.',
          'Use this only to confirm the service and proxy work.',
        ]}
      />
      <CoolCompareColumn
        title="Production-style test"
        code="https://analytics.example.com:3000"
        items={[
          'Point DNS to your server IP address.',
          'Keep :3000 in the Coolify URL configuration.',
          'Visit https://analytics.example.com in your browser.',
        ]}
      />
    </CoolCompare>
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
