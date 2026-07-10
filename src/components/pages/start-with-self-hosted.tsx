'use client';

import type React from 'react';
import { Children, isValidElement, useEffect, useLayoutEffect, useState } from 'react';
import type { IconComponent } from 'reicon-react';
import { CoolActionCard } from '@/components/docs/cool-action-card';
import { CoolActionCardGrid } from '@/components/docs/cool-action-card-grid';
import { CoolCallout } from '@/components/docs/cool-callout';
import { CoolPanel } from '@/components/docs/cool-layout';
import type { CoolActionType } from '@/components/docs/cool-types';
import {
  ArrowRight,
  Autobrightness2,
  Check,
  Database,
  LaptopCode,
  Refresh23,
  Rocket2,
  Settings,
  SecuritySafe2,
  ServerCloud,
  SignalStream,
  WindowPointer,
} from 'reicon-react';

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

export const firewallSshGuides = [
  {
    title: 'SSH access',
    detail: 'Configure OpenSSH so Coolify can connect to your server.',
    bullets: ['Confirm SSH works from your machine', 'Use root or a sudo-capable user'],
    href: '/knowledge-base/server/openssh',
    icon: SecuritySafe2,
    cta: 'Configure SSH',
    type: 'secondary',
  },
  {
    title: 'Firewall ports',
    detail: 'Open the required ports on firewall.',
    bullets: ['Allow SSH access', 'Open Coolify and application ports'],
    href: '/knowledge-base/server/firewall',
    icon: SignalStream,
    cta: 'Configure Firewall',
    type: 'primary',
  },
] satisfies Array<{
  title: string;
  detail: string;
  bullets: string[];
  href: string;
  icon: IconComponent;
  cta: string;
  type: CoolActionType;
}>;

export const nextSteps = [
  {
    title: 'Deploy an application',
    detail: 'Start with an app deployment once your server is connected.',
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

export function SelfHostedProjectResources() {
  return (
    <CoolCallout contentClassName="!p-0" icon={ServerCloud} title="Example production setup">
      <CoolPanel>
        <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
          ShadowArcanist runs a mixed production workload on one server with the resources below.
          Use this as a rough reference point, not a fixed recommendation.
        </p>
      </CoolPanel>
      <div className="grid gap-0 border-t border-fd-border lg:grid-cols-[0.9fr_1.1fr]">
        <CoolPanel className="border-b border-fd-border lg:border-b-0 lg:border-e">
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
        </CoolPanel>

        <CoolPanel>
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
        </CoolPanel>
      </div>
    </CoolCallout>
  );
}

export function SelfHostedFirewallSshBasics() {
  return (
    <CoolActionCardGrid data-self-hosted-start className="not-prose my-5" surface>
      {firewallSshGuides.map((guide) => (
        <CoolActionCard
          key={guide.title}
          href={guide.href}
          title={guide.title}
          description={guide.detail}
          bullets={guide.bullets}
          btn-cta={guide.cta}
          icon={guide.icon}
          type={guide.type}
        />
      ))}
    </CoolActionCardGrid>
  );
}

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

    function handleMdxTabChange(event: Event) {
      const detail = (event as CustomEvent<{ hash?: string; id?: string; value?: string }>).detail;
      if (detail.id !== 'installation-method-tabs' || !detail.value) return;

      const tab = installationTabs.find((item) => item.value === detail.value);
      if (!tab) return;

      activateTab(tab.value, detail.hash ?? `#${tab.id}`);
    }

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('mdx-tabs:set-active', handleMdxTabChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('mdx-tabs:set-active', handleMdxTabChange);
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
