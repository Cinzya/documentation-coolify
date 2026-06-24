import type React from 'react';
import {
  ArrowRight,
  Box2,
  Check,
  Database,
  Globe3,
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

const appDeploymentFlow = {
  checklist: [
    'Confirm the Coolify proxy is running before creating the app.',
    'Use the Docker Image resource type so no repository or build setup is required.',
    'Deploy nginx:alpine and expose port 80.',
    'Use the generated sslip.io domain for the first test.',
    'Open the generated URL and confirm the Nginx welcome page loads.',
  ],
  steps: ['Check proxy status', 'Create or open a project', 'Choose Docker Image', 'Configure nginx:alpine', 'Deploy and open the URL'],
};

const prerequisiteCards = [
  {
    title: 'Dashboard access',
    description: 'You can sign in to Coolify and see the main dashboard.',
    bullets: ['You can access Coolify in your browser', 'You can use the left sidebar'],
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
    bullets: ['Check Ports Exposes is 80', 'Use nginx:alpine for this guide'],
    icon: Warning22,
  },
  {
    title: 'Application link does not open',
    description: 'Usually means the server or proxy is not reachable from your browser.',
    bullets: ['Confirm ports 80 and 443 are open', 'Confirm Proxy is running'],
    icon: SignalStream,
  },
  {
    title: 'Browser says site not secure',
    description: 'Generated testing domains can hit certificate limits. A real domain is more reliable for TLS.',
    bullets: ['Point DNS to the server IP', 'Enter the domain with https:// in Coolify'],
    icon: Globe3,
  },
];

const nextSteps = [
  {
    title: 'Deploy your first database',
    detail: 'Add persistent data once your first app is reachable.',
    href: '/deploy-your-first-database',
    icon: Database,
  },
  {
    title: 'Deploy your first service',
    detail: 'Use the service catalog for common self-hosted tools.',
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
    <CoolActionCardGrid data-first-app className="not-prose my-5">
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
      <div className="grid gap-0 md:grid-cols-2">
        <NetworkChoice
          title="Fastest first test"
          code="http://<uuid>.<server-ip>.sslip.io"
          points={[
            'Keep the generated sslip.io URL.',
            'Deploy immediately without DNS setup.',
            'Use this only to confirm routing works.',
          ]}
        />
        <NetworkChoice
          title="Production-style test"
          code="https://example.com"
          points={[
            'Point DNS to your server IP address.',
            'Replace the generated domain in Coolify.',
            'Use https:// so certificates can be issued.',
          ]}
        />
      </div>
    </CoolCallout>
  );
}

export function FirstAppTroubleshooting() {
  return (
    <CoolActionCardGrid data-first-app className="not-prose my-5">
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-3">
        {issueCards.map((issue) => (
          <CoolActionCard
            key={issue.title}
            title={issue.title}
            description={issue.description}
            bullets={issue.bullets}
            icon={issue.icon}
          />
        ))}
      </div>
    </CoolActionCardGrid>
  );
}

export function FirstAppNextSteps() {
  return (
    <section data-first-app data-cool-docs className="not-prose my-6 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
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

function NetworkChoice({ code, points, title }: { code: string; points: string[]; title: string }) {
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
