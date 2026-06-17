'use client';

import type React from 'react';
import { Children, isValidElement, useEffect, useLayoutEffect, useState } from 'react';
import type { IconComponent } from 'reicon-react';
import { CoolActionCard } from '@/components/docs/cool-action-card';
import { CoolActionCardGrid } from '@/components/docs/cool-action-card-grid';
import { CoolCallout } from '@/components/docs/cool-callout';
import { CoolFlow } from '@/components/docs/cool-flow';
import type { CoolActionCardVariant } from '@/components/docs/cool-types';
import {
  ArrowRight,
  Autobrightness2,
  Box2,
  Check,
  Database,
  Flash12,
  Globe3,
  LaptopCode,
  PenNib,
  Refresh23,
  Rocket2,
  Setting2,
  Settings,
  SecuritySafe2,
  Server,
  ServerCloud,
  ServerUpdate,
  ShieldSecurity2,
  Screencast2,
  SignalStream,
  WindowPointer,
} from 'reicon-react';

const installMethods = [
  {
    title: 'Automated',
    href: '#install-automated',
    tabValue: 'automated',
    detail: 'Run one script to install Coolify automatically.',
    bullets: ['Recommended by the Coolify team', 'One-command installation via script', 'Requires root user access'],
    icon: Autobrightness2,
    cta: 'Choose Automated',
    variant: 'secondary',
  },
  {
    title: 'Manual',
    href: '#install-manual',
    tabValue: 'manual',
    detail: 'Run each install step yourself for full control.',
    bullets: ['Works with existing Docker installations', 'Non-root and custom setups', 'You configure networking, volumes, and secrets'],
    icon: LaptopCode,
    cta: 'Choose Manual',
    variant: 'primary',
  },
  {
    title: 'Raspberry Pi OS',
    href: '#install-raspberry-pi-os',
    tabValue: 'raspberry',
    detail: 'Properly configure Raspberry Pi before installing Coolify.',
    bullets: ['Requires 64-bit Raspberry Pi OS', 'ARM64 architecture required', 'Compatible with both Automated and Manual install'],
    icon: ServerUpdate,
    cta: 'Choose Raspberry Pi OS',
    variant: 'tertiary',
  },
] satisfies Array<{
  title: string;
  href: string;
  tabValue: 'automated' | 'manual' | 'raspberry';
  detail: string;
  bullets: string[];
  icon: IconComponent;
  cta: string;
  variant: CoolActionCardVariant;
}>;

function openInstallMethodTab(event: React.MouseEvent<HTMLAnchorElement>, method: (typeof installMethods)[number]) {
  event.preventDefault();
  window.dispatchEvent(
    new CustomEvent('self-hosted-install-tab', {
      detail: {
        hash: method.href,
        value: method.tabValue,
      },
    }),
  );
}

const serverRequirementOptions: Array<{
  title: string;
  detail: string;
  icon: IconComponent;
  href?: string;
}> = [
  {
    title: 'VPS',
    detail: 'A Virtual Private Server from any provider.',
    icon: ServerCloud,
  },
  {
    title: 'Dedicated server',
    detail: 'A full physical server that you control.',
    icon: Server,
  },
  {
    title: 'Virtual machine',
    detail: 'A Linux VM running on your own infrastructure.',
    icon: Screencast2,
  },
  {
    title: 'Raspberry Pi',
    detail: 'A 64bit supported Raspberry Pi setup.',
    icon: ServerUpdate,
  },
  {
    title: 'Laptop',
    detail: 'An old or spare Linux laptop with SSH access.',
    icon: LaptopCode,
  },
  {
    title: 'Any Linux device',
    detail: 'Any device that runs Linux with SSH access.',
    icon: Flash12,
  },
];

const projectServerProfile = [
  {
    label: 'Hosting provider',
    value: 'Hetzner',
  },
  {
    label: 'Server type',
    value: 'CAX11',
  },
];

const projectResourceExample = [
  {
    resource: 'Memory',
    capacity: '4 GB',
    averageUsage: '3.2 GB',
  },
  {
    resource: 'CPU',
    capacity: '2 cores',
    averageUsage: '70-90%',
  },
  {
    resource: 'Storage',
    capacity: '40 GB',
    averageUsage: '32 GB',
  },
];

const projectResourceWorkloads = [
  '16 Static Sites',
  '9 Rust API services',
  '5 Rust Apps (full stack)',
  '4 Rust Discord bots',
  '7 Rust workers',
  '2 Valkey databases',
  '2 PostgreSQL databases',
  'Umami Analytics',
  'Coolify',
  'Beszel',
];

const firewallSshGuides = [
  {
    title: 'SSH access',
    detail: 'Configure OpenSSH so Coolify can connect to your server.',
    bullets: ['Confirm SSH works from your machine', 'Use root or a sudo-capable user'],
    href: '/knowledge-base/server/openssh',
    icon: SecuritySafe2,
    cta: 'Configure SSH',
    variant: 'secondary',
  },
  {
    title: 'Firewall ports',
    detail: 'Open the required ports on firewall.',
    bullets: ['Allow SSH access', 'Open Coolify and application ports'],
    href: '/knowledge-base/server/firewall',
    icon: SignalStream,
    cta: 'Configure Firewall',
    variant: 'primary',
  },
] satisfies Array<{
  title: string;
  detail: string;
  bullets: string[];
  href: string;
  icon: IconComponent;
  cta: string;
  variant: CoolActionCardVariant;
}>;

const methodGuides = {
  automated: {
    id: 'automated-install-flow',
    title: 'Automated install flow',
    summary: 'Run one command, let the installer setup everything, then access the Coolify dashboard.',
    icon: Autobrightness2,
    focus: [
      'Use a fresh server when possible.',
      'Use root user account.',
      'Open necessary ports on Firewall.',
      'Create admin account as soon as possible.',
      'Back up generated installation secrets.',
    ],
    steps: [
      'Run the installer',
      'Wait for Coolify to start',
      'Visit http://<server-ip-here>:8000',
      'Create the admin account',
      'Back up /data/coolify/source/.env',
    ],
    result: 'You should end with a running Coolify dashboard, first admin account, and saved installation secrets.',
  },
  manual: {
    id: 'manual-install-flow',
    title: 'Manual install flow',
    summary: 'Prepare the Coolify directory structure, SSH access, file permissions, secrets, Docker network, then start Coolify with Docker Compose.',
    icon: LaptopCode,
    focus: [
      'Requires curl and Docker Engine 24+.',
      'Works well for existing Docker or custom server setups.',
      'SSH key setup is required so Coolify can manage the server.',
      'Save generated environment values before running production workloads.',
    ],
    steps: [
      'Create required directories',
      'Generate and register SSH key',
      'Download required files',
      'Set file permissions',
      'Generate secure environment values',
      'Create Docker network',
      'Start Coolify with Docker Compose',
      'Create the admin account',
    ],
    result: 'You should end with a running Coolify dashboard while keeping every host-level setup step under your control.',
  },
  raspberry: {
    id: 'raspberry-pi-flow',
    title: 'Raspberry Pi flow',
    summary: 'Install a 64-bit Raspberry Pi OS image first, enable SSH, then use the Automated or Manual installation methods.',
    icon: ServerCloud,
    focus: [
      'Use Raspberry Pi OS Lite 64-bit for the cleanest starting point.',
      'Enable SSH during imaging so Coolify can complete onboarding later.',
      'Avoid passphrase or 2FA-protected SSH keys for this first setup.',
    ],
    steps: ['Flash 64-bit OS', 'Enable SSH', 'Boot the Pi', 'Follow Automated or Manual installation method'],
    result: 'After the Pi boots, continue with one of the installation methods above.',
  },
} as const;

const nextSteps = [
  {
    title: 'Deploy an application',
    detail: 'Start with an app deployment once the local server is connected.',
    href: '/deploy-your-first-app',
    icon: WindowPointer,
  },
  {
    title: 'Deploy a database',
    detail: 'Add a database when your first app needs persistent data.',
    href: '/deploy-your-first-database',
    icon: Database,
  },
  {
    title: 'Deploy a service',
    detail: 'Launch a one-click service from the service catalog.',
    href: '/deploy-your-first-service',
    icon: Settings,
  },
];

const expansionSteps = [
  {
    title: 'Add and validate servers',
    href: 'shadow-to-do',
  },
  {
    title: 'Build server',
    href: 'shadow-to-do',
  },
  {
    title: 'Multiple servers',
    href: 'shadow-to-do',
  },
];

const operationLinks = [
  {
    title: 'Upgrade',
    href: 'shadow-to-do',
  },
  {
    title: 'Downgrade',
    href: 'shadow-to-do',
  },
  {
    title: 'Uninstallation',
    href: 'shadow-to-do',
  },
];

const advancedOptions = [
  {
    title: 'Root user',
    detail: 'Pre-create the admin account so public registration is never exposed.',
    href: '#_1-root-user',
    icon: ShieldSecurity2,
    tab: 'Root user',
  },
  {
    title: 'Custom Docker network',
    detail: 'Avoid network overlap with infrastructure-controlled address pools.',
    href: '#_2-custom-docker-network',
    icon: Globe3,
    tab: 'Custom Docker network',
  },
  {
    title: 'Custom registry source',
    detail: 'Pull Coolify images from ghcr.io or docker.io.',
    href: '#_3-custom-registry-source',
    icon: Box2,
    tab: 'Custom registry source',
  },
  {
    title: 'Compose overrides',
    detail: 'Persist custom ports, labels, resources, or container settings across upgrades.',
    href: '#_4-compose-overrides',
    icon: PenNib,
    tab: 'Compose overrides',
  },
];

function openAdvancedOptionTab(event: React.MouseEvent<HTMLAnchorElement>, option: (typeof advancedOptions)[number]) {
  event.preventDefault();
  window.dispatchEvent(
    new CustomEvent('mdx-tabs:set-active', {
      detail: {
        id: 'advanced-install-option-tabs',
        value: option.tab,
      },
    }),
  );
  window.history.replaceState(null, '', '#advanced-installations');
}

function InstallMethodCards({ methods, gridClassName }: { methods: typeof installMethods; gridClassName: string }) {
  return (
    <CoolActionCardGrid>
      <div className={`grid gap-4 p-4 sm:p-5 ${gridClassName}`}>
        {methods.map((method) => (
          <CoolActionCard
            key={method.title}
            href={method.href}
            onClick={(event) => openInstallMethodTab(event, method)}
            title={method.title}
            description={method.detail}
            bullets={method.bullets}
            cta={method.cta}
            icon={method.icon}
            variant={method.variant}
          />
        ))}
      </div>
    </CoolActionCardGrid>
  );
}

export function SelfHostedInstallMethods() {
  return (
    <div data-self-hosted-start className="not-prose my-6">
      <InstallMethodCards methods={installMethods} gridClassName="lg:grid-cols-3" />
    </div>
  );
}

export function SelfHostedRaspberryInstallMethods() {
  return (
    <div data-self-hosted-start className="not-prose my-5">
      <InstallMethodCards
        methods={installMethods.filter((method) => method.tabValue !== 'raspberry')}
        gridClassName="lg:grid-cols-2"
      />
    </div>
  );
}

export function SelfHostedServerRequirements() {
  return (
    <div data-self-hosted-start className="not-prose my-4">
      <section className="overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
          {serverRequirementOptions.map((option) => {
            const Icon = option.icon;
            const content = (
              <>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-fd-border bg-fd-muted/40 text-fd-foreground">
                  <Icon className="size-5" weight="Filled" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-fd-foreground">
                    {option.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-fd-muted-foreground">
                    {option.detail}
                  </span>
                </span>
              </>
            );

            if (option.href) {
              return (
                <a
                  key={option.title}
                  href={option.href}
                  className="group flex gap-3 rounded-lg border border-fd-border bg-fd-background/70 p-4 shadow-sm transition hover:bg-fd-muted/35"
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={option.title}
                className="flex gap-3 rounded-lg border border-fd-border bg-fd-background/70 p-4 shadow-sm"
              >
                {content}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

export function SelfHostedProjectResources() {
  return (
    <CoolCallout data-self-hosted-start className="not-prose my-6" contentClassName="!p-0" id="example-production-setup" icon={ServerCloud} title="Example production setup">
      <div className="p-4 sm:p-5">
        <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
          ShadowArcanist runs a mixed production workload on one server with the resources below.
          Use this as a rough reference point, not a fixed recommendation.
        </p>
      </div>
      <div className="grid gap-0 border-t border-fd-border lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-fd-border p-4 lg:border-b-0 lg:border-e sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {projectServerProfile.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-fd-border bg-fd-muted/20 p-3"
              >
                <p className="m-0 text-xs leading-5 text-fd-muted-foreground">{item.label}</p>
                <p className="m-0 mt-1 text-sm font-semibold text-fd-foreground">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-3">
            {projectResourceExample.map((item) => (
              <div
                key={item.resource}
                className="rounded-lg border border-fd-border bg-fd-muted/20 p-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-fd-foreground">{item.resource}</span>
                  <span className="text-sm font-medium text-fd-foreground">{item.capacity}</span>
                </div>
                <p className="m-0 mt-1 text-xs leading-5 text-fd-muted-foreground">
                  Average usage: {item.averageUsage}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="m-0 text-sm font-semibold text-fd-foreground">
            This server comfortably supports:
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {projectResourceWorkloads.map((workload) => (
              <div key={workload} className="flex gap-2 text-sm leading-6 text-fd-muted-foreground">
                <Check className="mt-1 size-4 shrink-0 text-fd-foreground" aria-hidden="true" />
                <span>{workload}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CoolCallout>
  );
}

export function SelfHostedFirewallSshBasics() {
  return (
    <CoolActionCardGrid data-self-hosted-start className="not-prose my-5">
      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
        {firewallSshGuides.map((guide) => (
          <CoolActionCard
            key={guide.title}
            href={guide.href}
            title={guide.title}
            description={guide.detail}
            bullets={guide.bullets}
            cta={guide.cta}
            icon={guide.icon}
            variant={guide.variant}
          />
        ))}
      </div>
    </CoolActionCardGrid>
  );
}

type MethodGuideType = keyof typeof methodGuides;

const installationTabs = [
  {
    icon: Autobrightness2,
    id: 'install-automated',
    label: 'Automated',
    value: 'automated',
  },
  {
    icon: LaptopCode,
    id: 'install-manual',
    label: 'Manual',
    value: 'manual',
  },
  {
    icon: ServerCloud,
    id: 'install-raspberry-pi-os',
    label: 'Raspberry Pi OS',
    value: 'raspberry',
  },
] as const;

type InstallationTabValue = (typeof installationTabs)[number]['value'];
type InstallationTabElement = React.ReactElement<{
  children: React.ReactNode;
  id: string;
  value: InstallationTabValue;
}>;

function getInstallationTabFromHash(hash: string): InstallationTabValue | undefined {
  const cleanHash = hash.replace(/^#/, '');
  return installationTabs.find((tab) => tab.id === cleanHash)?.value;
}

function scrollToInstallTab(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - 144;
  window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
}

function scheduleInstallTabScroll(hash: string) {
  scrollToInstallTab(hash);
  requestAnimationFrame(() => scrollToInstallTab(hash));
}

export function SelfHostedInstallationTabs({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<InstallationTabValue>('automated');
  const [pendingScrollHash, setPendingScrollHash] = useState<string | null>(null);
  const panels = Children.toArray(children).filter(isValidElement) as InstallationTabElement[];

  function activateTab(value: InstallationTabValue, hash: string, shouldScroll = true) {
    setActiveTab(value);
    window.history.replaceState(null, '', hash);

    if (shouldScroll) {
      setPendingScrollHash(hash);
    }
  }

  useLayoutEffect(() => {
    if (!pendingScrollHash) return;

    scheduleInstallTabScroll(pendingScrollHash);
    setPendingScrollHash(null);
  }, [activeTab, pendingScrollHash]);

  useLayoutEffect(() => {
    const initialHash = window.location.hash;
    const value = getInstallationTabFromHash(initialHash);
    if (value) {
      setActiveTab(value);
      setPendingScrollHash(initialHash);
    }
  }, []);

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash;
      const value = getInstallationTabFromHash(hash);
      if (value) {
        setActiveTab(value);
        setPendingScrollHash(hash);
      }
    }

    function handleInstallTab(event: Event) {
      const detail = (event as CustomEvent<{ hash: string; value: InstallationTabValue }>).detail;
      activateTab(detail.value, detail.hash);
    }

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('self-hosted-install-tab', handleInstallTab);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('self-hosted-install-tab', handleInstallTab);
    };
  }, []);

  const activePanel = panels.find((panel) => panel.props.value === activeTab);

  return (
    <div
      id="installation-method-tabs"
      data-installation-tabs
      className="my-4 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70"
    >
      <style>
        {`
          [data-installation-tabs] .installation-tab-active {
            border-color: transparent;
            color: white;
            background:
              linear-gradient(180deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.02) 44%, rgb(0 0 0 / 0.1)),
              linear-gradient(135deg, #8b73ff 0%, #6f50e8 48%, #5c38d5 100%);
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.18),
              inset 0 -1px 0 rgb(0 0 0 / 0.16),
              0 5px 12px rgb(94 62 216 / 0.2);
          }

          .dark [data-installation-tabs] .installation-tab-active {
            background: linear-gradient(135deg, #8b73ff 0%, #6f50e8 48%, #5c38d5 100%);
            box-shadow: 0 5px 12px rgb(94 62 216 / 0.22);
          }
        `}
      </style>
      <div className="not-prose flex gap-1 overflow-x-auto border-b border-fd-border bg-fd-muted/30 px-3 py-2 text-sm font-semibold text-fd-foreground">
        {installationTabs.map((tab) => {
          const isActive = tab.value === activeTab;
          const Icon = tab.icon;

          return (
            <button
              key={tab.value}
              type="button"
              className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors ${
                isActive
                  ? 'installation-tab-active'
                  : 'border-transparent text-fd-muted-foreground hover:bg-fd-muted/50 hover:text-fd-foreground'
              }`}
              onClick={() => activateTab(tab.value, `#${tab.id}`, false)}
            >
              <Icon className="size-4" weight="Filled" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="prose max-w-none bg-fd-background p-4 text-[0.9375rem] outline-none prose-no-margin">
        {activePanel}
      </div>
    </div>
  );
}

export function SelfHostedInstallationTab({ children, id }: { children: React.ReactNode; id: string; value: InstallationTabValue }) {
  return (
    <div id={id} className="scroll-mt-36">
      {children}
    </div>
  );
}

export function SelfHostedMethodGuide({ type }: { type: MethodGuideType }) {
  const guide = methodGuides[type];
  const steps = guide.steps.map((step) => {
    if (step === 'Visit http://<server-ip-here>:8000') {
      return (
        <>
          Visit{' '}
          <code className="rounded-md border border-fd-border bg-fd-muted px-1.5 py-0.5 text-xs font-semibold text-fd-foreground">
            http://&lt;server-ip-here&gt;:8000
          </code>
        </>
      );
    }

    if (step === 'Back up /data/coolify/source/.env') {
      return (
        <>
          Back up{' '}
          <code className="rounded-md border border-fd-border bg-fd-muted px-1.5 py-0.5 text-xs font-semibold text-fd-foreground">
            /data/coolify/source/.env
          </code>
        </>
      );
    }

    return step;
  });

  return (
    <section data-self-hosted-start className="not-prose">
      <CoolFlow
        checklist={[...guide.focus]}
        icon={guide.icon}
        id={guide.id}
        result={guide.result}
        steps={steps}
        summary={guide.summary}
        title={guide.title}
      />
    </section>
  );
}

export function SelfHostedNextSteps() {
  return (
    <section data-self-hosted-start className="not-prose my-6 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
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
                    <Icon className="size-5" weight="Filled" aria-hidden="true" />
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
      <div className="grid gap-0 border-t border-fd-border md:grid-cols-2">
        <NextStepLinkGroup
          title="Grow beyond one server"
          description="Add more compute capacity when your workloads outgrow the first server."
          icon={Rocket2}
          links={expansionSteps}
        />
        <NextStepLinkGroup
          title="Ongoing operations"
          description="Use these guides when you need to maintain or remove your Coolify instance."
          icon={Refresh23}
          links={operationLinks}
        />
      </div>
    </section>
  );
}

function NextStepLinkGroup({
  description,
  icon: Icon,
  links,
  title,
}: {
  description: string;
  icon: React.ComponentType<{ 'aria-hidden'?: boolean; className?: string; weight?: 'Filled' | 'Outline' }>;
  links: { href: string; title: string }[];
  title: string;
}) {
  return (
    <div className="border-b border-fd-border bg-fd-muted/[0.06] p-4 last:border-b-0 md:border-b-0 md:border-e md:last:border-e-0 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-fd-border bg-fd-background text-fd-foreground">
            <Icon className="size-5" weight="Filled" aria-hidden={true} />
          </span>
          <div className="min-w-0">
            <h3 className="m-0 text-sm font-semibold text-fd-foreground">{title}</h3>
            <p className="m-0 mt-1 text-sm leading-6 text-fd-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-1">
        {links.map((link, index) => (
          <a
            key={link.title}
            href={link.href}
            className="group flex items-center justify-between gap-3 rounded-md px-2 py-2.5 text-sm font-semibold text-fd-foreground transition hover:bg-fd-background"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-fd-border bg-fd-background text-xs text-fd-muted-foreground transition group-hover:border-fd-primary/45 group-hover:text-fd-primary">
                {index + 1}
              </span>
              <span className="truncate transition group-hover:text-fd-primary">{link.title}</span>
            </span>
            <ArrowRight
              className="size-3.5 shrink-0 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-fd-primary"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export function SelfHostedAdvancedOptions() {
  return (
    <CoolCallout data-self-hosted-start className="not-prose my-6" contentClassName="!p-0" id="advanced-install-options" icon={Setting2} title="Advanced install options">
      <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-2">
        {advancedOptions.map((option) => {
          const Icon = option.icon;

          return (
            <a
              key={option.title}
              href={option.href}
              onClick={(event) => openAdvancedOptionTab(event, option)}
              className="method-card method-card-primary group flex gap-3 rounded-lg border border-fd-border bg-fd-muted/20 p-4 shadow-sm transition duration-200 hover:-translate-y-1"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-fd-border bg-fd-background text-fd-foreground">
                <Icon className="size-5" weight="Filled" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-fd-foreground">{option.title}</span>
                <span className="mt-1 block text-sm leading-6 text-fd-muted-foreground">{option.detail}</span>
              </span>
            </a>
          );
        })}
      </div>
    </CoolCallout>
  );
}
