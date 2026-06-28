'use client';

import {
  Box2,
  Database,
  Globe3,
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

const appDeploymentFlow = {
  checklist: [
    'Create or open the project where the app will live.',
    'Use the Docker Image resource type so no repository or build setup is required.',
    'Deploy nginx:alpine and expose port 80.',
    'Use the generated sslip.io domain for the first test.',
    'Open the generated URL and confirm the Nginx welcome page loads.',
  ],
  steps: ['Create or open a project', 'Choose Docker Image', 'Enter nginx:alpine', 'Set port 80', 'Deploy and open the URL'],
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
    description: 'Open the server page in Coolify and check the proxy status.',
    bullets: ['Status says Proxy is running', 'If it is stopped, click Start Proxy'],
    icon: SignalStream,
  },
];

const issueCards = [
  {
    title: 'No Available Server',
    description: 'Usually means the port setting does not match the app.',
    href: '#first-app-issues',
    icon: Warning22,
  },
  {
    title: "Link doesn't open",
    description: 'Usually means the server or proxy is not reachable from your browser.',
    href: '#first-app-issues',
    icon: SignalStream,
  },
  {
    title: 'Site not secure',
    description: 'sslip.io can be rate-limited. Use a real domain.',
    href: '#first-app-issues',
    icon: Globe3,
  },
];

const nextSteps = [
  {
    title: 'Deploy a database',
    detail: 'Deploy a database when your app needs persistent data.',
    href: '/deploy-your-first-database',
    icon: Database,
  },
  {
    title: 'Deploy a service',
    detail: 'Deploy a ready-made service from the Coolify catalog.',
    href: '/deploy-your-first-service',
    icon: Settings,
  },
  {
    title: 'Learn build packs',
    detail: 'Move from pre-built images to Git-based application deployments.',
    href: '/applications/build-packs/overview',
    icon: Box2,
  },
];

export function FirstAppPrerequisites() {
  return (
    <FirstDeployCardGrid cards={prerequisiteCards} dataAttribute="data-first-app" />
  );
}

export function FirstAppDeploymentFlow() {
  return (
    <section data-first-app className="not-prose my-5">
      <CoolFlow
        checklist={appDeploymentFlow.checklist}
        icon={Rocket2}
        id="first-app-deployment-flow"
        result="You should end with a running nginx container, a generated application URL, and a visible Nginx welcome page."
        steps={appDeploymentFlow.steps}
        summary="This first deployment uses a pre-built Docker image, so you can check that Coolify can create an app, start it, and give you a URL without adding Git or build settings."
        title="First app deployment flow"
      />
    </section>
  );
}

export function FirstAppNetworkChoices() {
  return (
    <CoolCallout data-first-app className="not-prose my-5 overflow-hidden" contentClassName="!p-0" id="first-app-network" icon={Globe3} title="Generated URL or your own domain">
      <FirstDeployChoiceGrid
        choices={[
          {
            title: 'Fastest first test',
            code: 'http://<uuid>.<server-ip>.sslip.io',
            points: [
              'Keep the generated sslip.io URL.',
              'Deploy immediately without DNS setup.',
              'Use this only to confirm routing works.',
            ],
          },
          {
            title: 'Production-style test',
            code: 'https://shadowarcanist.com',
            points: [
              'Point DNS to your server IP address.',
              'Replace the generated domain in Coolify.',
              'Use https:// so TLS certificates can be issued.',
            ],
          },
        ]}
      />
    </CoolCallout>
  );
}

export function FirstAppTroubleshooting() {
  return (
    <FirstDeployCardGrid
      cards={issueCards}
      onCardClick={(event, issue) => openFirstDeployIssueTab(event, 'first-app-issues', issue.title)}
      dataAttribute="data-first-app"
    />
  );
}

export function FirstAppNextSteps() {
  return (
    <FirstDeployNextSteps steps={nextSteps} dataAttribute="data-first-app" />
  );
}
