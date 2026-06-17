'use client';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import type React from 'react';
import { Children, isValidElement, useEffect, useLayoutEffect, useState } from 'react';
import type { IconComponent } from 'reicon-react';
import {
  ArrowRight,
  ArrowsDown,
  ArrowsRight,
  Autobrightness2,
  Box2,
  Check,
  Checklist2,
  Database,
  Flash12,
  Globe3,
  LaptopCode,
  Layers,
  Link3,
  Notes2,
  PenNib,
  Refresh23,
  Rocket2,
  SackDollar,
  Setting2,
  Settings,
  SecuritySafe2,
  Server,
  ServerCloud,
  ServerUpdate,
  ShieldSecurity2,
  Screencast2,
  SignalStream,
  StarSparkle,
  WindowPointer,
} from 'reicon-react';

const installMethods = [
  {
    title: 'Automated',
    href: '#install-automated',
    detail: 'Run one script to install Coolify automatically.',
    bullets: ['Recommended by the Coolify team', 'One-command installation via script', 'Requires root user access'],
    icon: Autobrightness2,
    cta: 'Choose Automated',
    variant: 'automated',
  },
  {
    title: 'Manual',
    href: '#install-manual',
    detail: 'Run each install step yourself for full control.',
    bullets: ['Works with existing Docker installations', 'Non-root and custom setups', 'You configure networking, volumes, and secrets'],
    icon: LaptopCode,
    cta: 'Choose Manual',
    variant: 'manual',
  },
  {
    title: 'Raspberry Pi OS',
    href: '#install-raspberry-pi-os',
    detail: 'Properly configure Raspberry Pi before installing Coolify.',
    bullets: ['Requires 64-bit Raspberry Pi OS', 'ARM64 architecture required', 'Compatible with both Automated and Manual install'],
    icon: ServerUpdate,
    cta: 'Choose Raspberry Pi OS',
    variant: 'raspberry',
  },
];

function openInstallMethodTab(event: React.MouseEvent<HTMLAnchorElement>, method: (typeof installMethods)[number]) {
  event.preventDefault();
  window.dispatchEvent(
    new CustomEvent('self-hosted-install-tab', {
      detail: {
        hash: method.href,
        value: method.variant,
      },
    }),
  );
}

const supportedOperatingSystems = [
  {
    base: 'Debian-based',
    distributions: 'Debian, Ubuntu',
    notes: 'Ubuntu non-LTS: use Manual install',
  },
  {
    base: 'Red Hat-based',
    distributions: 'CentOS, Fedora, Red Hat, AlmaLinux, Rocky, TencentOS, Asahi',
    notes: 'Docker may need manual pre-install on some variants',
  },
  {
    base: 'SUSE-based',
    distributions: 'SLES, SUSE, openSUSE',
    notes: 'Supported',
  },
  {
    base: 'Arch-based',
    distributions: 'Arch Linux',
    notes: 'Supported',
  },
  {
    base: 'Alpine-based',
    distributions: 'Alpine Linux',
    notes: 'Supported',
  },
  {
    base: 'Raspberry Pi OS',
    distributions: 'Raspberry Pi OS (64-bit)',
    notes: 'Use 64-bit image',
  },
];

const hardwareRequirements = [
  {
    item: 'CPU',
    minimum: '2 cores',
    notes: 'Increase cores if running multiple workloads on one server.',
  },
  {
    item: 'Memory',
    minimum: '2 GB RAM',
    notes: 'Increase memory as your workload grows.',
  },
  {
    item: 'Disk',
    minimum: '10 GB free space',
    notes: 'Keep additional space for Docker images, volumes, and backups.',
  },
  {
    item: 'Architecture',
    minimum: 'amd64 or arm64',
    notes: 'ARM64 is required for Raspberry Pi OS installations.',
  },
];

const raspberryPrerequisites = [
  {
    model: 'Raspberry Pi Zero 2 W',
    notes: 'Only 64-bit Raspberry Pi model Supported.',
  },
  {
    model: 'Raspberry Pi 400',
    notes: 'Only 64-bit Raspberry Pi model Supported.',
  },
  {
    model: 'Raspberry Pi 3',
    notes: 'All models are supported.',
  },
  {
    model: 'Raspberry Pi 4',
    notes: 'All models are supported.',
  },
  {
    model: 'Raspberry Pi 5',
    notes: 'All models are supported.',
  },
];

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
    variant: 'automated',
  },
  {
    title: 'Firewall ports',
    detail: 'Open the required ports on firewall.',
    bullets: ['Allow SSH access', 'Open Coolify and application ports'],
    href: '/knowledge-base/server/firewall',
    icon: SignalStream,
    cta: 'Configure Firewall',
    variant: 'manual',
  },
];

const beforeBeginSections = [
  {
    section: 'Server requirements',
    href: '#1-server-requirements',
    check: 'Confirm you have a server or device with SSH access.',
  },
  {
    section: 'Supported operating systems',
    href: '#2-supported-operating-systems',
    check: 'Confirm your Linux distribution is supported.',
  },
  {
    section: 'Minimum hardware requirements',
    href: '#3-minimum-hardware-requirements',
    check: 'Confirm CPU, memory, disk, and architecture fit Coolify.',
  },
  {
    section: 'Server resources for your projects',
    href: '#4-server-resources-for-your-projects',
    check: 'Estimate resources based on the projects you plan to run.',
  },
  {
    section: 'Configure SSH access and firewall',
    href: '#5-configure-ssh-access-and-firewall',
    check: 'Prepare SSH access and required firewall ports.',
  },
];

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

type SelfHostedTableRow = {
  cells: React.ReactNode[];
};

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

function SelfHostedCustomTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: SelfHostedTableRow[];
}) {
  return (
    <div data-self-hosted-start className="not-prose my-3 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
      <div className="relative overflow-auto prose-no-margin">
        <table className="comparison-table w-full min-w-[42rem] sm:min-w-0 text-sm">
          <thead>
            <tr className="comparison-header">
              {columns.map((column, index) => (
                <th key={column} className={index === 0 ? 'font-semibold text-fd-muted-foreground' : 'font-semibold text-fd-foreground'}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <td key={cellIndex} className={cellIndex === 0 ? 'font-medium text-fd-foreground' : 'leading-6 text-fd-muted-foreground'}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SelfHostedAdvancedRootUserTable() {
  return (
    <SelfHostedCustomTable
      columns={['Variable', 'Required', 'Notes']}
      rows={[
        { cells: [<code key="root-username">ROOT_USERNAME</code>, 'Yes', '3-255 characters. Allowed: letters, numbers, spaces, underscores, and hyphens.'] },
        { cells: [<code key="root-email">ROOT_USER_EMAIL</code>, 'Yes', 'Must be a valid email format with a valid DNS record, up to 255 characters.'] },
        { cells: [<code key="root-password">ROOT_USER_PASSWORD</code>, 'Yes', 'At least 8 characters with uppercase, lowercase, number, and special symbol.'] },
      ]}
    />
  );
}

export function SelfHostedAdvancedDockerNetworkTable() {
  return (
    <SelfHostedCustomTable
      columns={['Variable', 'Required', 'Notes']}
      rows={[
        { cells: [<code key="pool-base">DOCKER_ADDRESS_POOL_BASE</code>, 'Yes', <>Valid CIDR, for example <code>10.0.0.0/8</code>.</>] },
        { cells: [<code key="pool-size">DOCKER_ADDRESS_POOL_SIZE</code>, 'Yes', <>Numeric value, recommended <code>16-28</code>.</>] },
        { cells: [<code key="pool-force">DOCKER_POOL_FORCE_OVERRIDE</code>, 'No', <>Set <code>true</code> only to override an existing host pool.</>] },
      ]}
    />
  );
}

export function SelfHostedAdvancedRegistrySourceTable() {
  return (
    <SelfHostedCustomTable
      columns={['Variable', 'Default', 'Allowed values']}
      rows={[
        { cells: [<code key="registry-url">REGISTRY_URL</code>, <code key="ghcr">ghcr.io</code>, <><code>ghcr.io</code>, <code>docker.io</code></>] },
      ]}
    />
  );
}

export function SelfHostedAdvancedComposeFileTable() {
  return (
    <SelfHostedCustomTable
      columns={['File path', 'Purpose']}
      rows={[
        { cells: [<code key="custom-compose">/data/coolify/source/docker-compose.custom.yml</code>, 'Custom compose overrides that persist across upgrades.'] },
      ]}
    />
  );
}

export function SelfHostedAdvancedComposeServicesTable() {
  return (
    <SelfHostedCustomTable
      columns={['Service name', 'Container name', 'Description']}
      rows={[
        { cells: [<code key="coolify-service">coolify</code>, <code key="coolify-container">coolify</code>, 'Main Coolify application'] },
        { cells: [<code key="postgres-service">postgres</code>, <code key="postgres-container">coolify-db</code>, 'PostgreSQL database'] },
        { cells: [<code key="redis-service">redis</code>, <code key="redis-container">coolify-redis</code>, 'Redis cache'] },
        { cells: [<code key="soketi-service">soketi</code>, <code key="soketi-container">coolify-realtime</code>, 'WebSocket server'] },
      ]}
    />
  );
}

function SectionHeader({
  id,
  icon: Icon,
  title,
}: {
  id: string;
  icon: typeof ArrowsRight;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copySectionLink() {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div id={id} className="section-header flex items-center justify-between gap-3 border-b border-fd-border px-4 py-3 text-sm font-semibold text-fd-foreground scroll-mt-24">
      <div className="flex min-w-0 items-center gap-2">
        <Icon className="size-4 shrink-0" weight="Filled" aria-hidden="true" />
        <span className="truncate">{title}</span>
      </div>
      <button
        type="button"
        aria-label={`Copy link to ${title}`}
        title={copied ? 'Copied' : 'Copy link'}
        onClick={copySectionLink}
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-fd-muted-foreground transition hover:bg-fd-muted/50 hover:text-fd-foreground"
      >
        <Link3 className="size-4" weight="Filled" aria-hidden="true" />
      </button>
    </div>
  );
}

export function StartWithSelfHosted() {
  return (
    <div data-self-hosted-start className="not-prose my-8 space-y-7">
      <style>
        {`
          [data-self-hosted-start] .method-card,
          [data-self-hosted-start] .requirement-card,
          [data-self-hosted-start] .safety-card {
            background-clip: padding-box;
          }

          [data-self-hosted-start] .requirement-card:hover {
            border-color: transparent;
            background:
              linear-gradient(rgb(10 10 10 / 0.94), rgb(10 10 10 / 0.94)) padding-box,
              linear-gradient(135deg, #9a86ff 0%, #7a5cf0 48%, #6643dd 100%) border-box;
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.08),
              0 0 0 1px rgb(139 115 255 / 0.14),
              0 12px 28px rgb(94 62 216 / 0.2),
              0 2px 14px rgb(255 255 255 / 0.035);
          }

          html:not(.dark) [data-self-hosted-start] .requirement-card:hover {
            background:
              linear-gradient(rgb(255 255 255 / 0.96), rgb(255 255 255 / 0.96)) padding-box,
              linear-gradient(135deg, #9a86ff 0%, #7a5cf0 48%, #6643dd 100%) border-box;
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.75),
              0 0 0 1px rgb(139 115 255 / 0.12),
              0 12px 28px rgb(94 62 216 / 0.14),
              0 2px 10px rgb(0 0 0 / 0.05);
          }

          [data-self-hosted-start] .method-card-automated:hover {
            border-color: transparent;
            background:
              linear-gradient(rgb(10 10 10 / 0.94), rgb(10 10 10 / 0.94)) padding-box,
              linear-gradient(135deg, #7b8cff 0%, #5865f2 52%, #4652d9 100%) border-box;
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.08),
              0 0 0 1px rgb(88 101 242 / 0.14),
              0 12px 28px rgb(88 101 242 / 0.2),
              0 2px 14px rgb(255 255 255 / 0.035);
          }

          html:not(.dark) [data-self-hosted-start] .method-card-automated:hover {
            background:
              linear-gradient(rgb(255 255 255 / 0.96), rgb(255 255 255 / 0.96)) padding-box,
              linear-gradient(135deg, #7b8cff 0%, #5865f2 52%, #4652d9 100%) border-box;
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.75),
              0 0 0 1px rgb(88 101 242 / 0.12),
              0 12px 28px rgb(88 101 242 / 0.14),
              0 2px 10px rgb(0 0 0 / 0.05);
          }

          [data-self-hosted-start] .method-card-manual:hover {
            border-color: transparent;
            background:
              linear-gradient(rgb(10 10 10 / 0.94), rgb(10 10 10 / 0.94)) padding-box,
              linear-gradient(135deg, #9a86ff 0%, #7a5cf0 48%, #6643dd 100%) border-box;
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.08),
              0 0 0 1px rgb(139 115 255 / 0.14),
              0 12px 28px rgb(94 62 216 / 0.2),
              0 2px 14px rgb(255 255 255 / 0.035);
          }

          html:not(.dark) [data-self-hosted-start] .method-card-manual:hover {
            background:
              linear-gradient(rgb(255 255 255 / 0.96), rgb(255 255 255 / 0.96)) padding-box,
              linear-gradient(135deg, #9a86ff 0%, #7a5cf0 48%, #6643dd 100%) border-box;
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.75),
              0 0 0 1px rgb(139 115 255 / 0.12),
              0 12px 28px rgb(94 62 216 / 0.14),
              0 2px 10px rgb(0 0 0 / 0.05);
          }

          [data-self-hosted-start] .method-card-raspberry:hover {
            border-color: transparent;
            background:
              linear-gradient(rgb(10 10 10 / 0.94), rgb(10 10 10 / 0.94)) padding-box,
              linear-gradient(135deg, #71717a 0%, #52525b 52%, #3f3f46 100%) border-box;
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.08),
              0 0 0 1px rgb(82 82 91 / 0.16),
              0 12px 28px rgb(63 63 70 / 0.2),
              0 2px 14px rgb(255 255 255 / 0.035);
          }

          html:not(.dark) [data-self-hosted-start] .method-card-raspberry:hover {
            background:
              linear-gradient(rgb(255 255 255 / 0.96), rgb(255 255 255 / 0.96)) padding-box,
              linear-gradient(135deg, #71717a 0%, #52525b 52%, #3f3f46 100%) border-box;
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.75),
              0 0 0 1px rgb(82 82 91 / 0.14),
              0 12px 28px rgb(63 63 70 / 0.13),
              0 2px 10px rgb(0 0 0 / 0.05);
          }

          [data-self-hosted-start] .section-header {
            background: rgb(255 255 255 / 0.035);
          }

          html:not(.dark) [data-self-hosted-start] .section-header {
            background: rgb(0 0 0 / 0.045);
          }

          [data-self-hosted-start] .comparison-header {
            background: rgb(255 255 255 / 0.035);
          }

          html:not(.dark) [data-self-hosted-start] .comparison-header {
            background: rgb(0 0 0 / 0.045);
          }

          [data-self-hosted-start] .comparison-table {
            border-collapse: separate;
            border-spacing: 0;
          }

          [data-self-hosted-start] .comparison-table th,
          [data-self-hosted-start] .comparison-table td {
            border-inline-start: 1px solid var(--color-fd-border);
            border-bottom: 1px solid var(--color-fd-border);
            padding: 1rem;
            text-align: start;
            vertical-align: top;
          }

          [data-self-hosted-start] .comparison-table th:first-child,
          [data-self-hosted-start] .comparison-table td:first-child {
            border-inline-start: 0;
          }

          [data-self-hosted-start] .comparison-table tbody tr:last-child td {
            border-bottom: 0;
          }

          [data-self-hosted-start] .comparison-table code {
            border: 1px solid var(--color-fd-border);
            border-radius: 0.375rem;
            background: var(--color-fd-muted);
            color: var(--color-fd-foreground);
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.125rem 0.375rem;
          }

          [data-self-hosted-start] .comparison-table strong {
            color: var(--color-fd-foreground);
            font-weight: 700;
          }

          [data-self-hosted-start] .method-button {
            border-color: transparent;
            border-radius: 0.625rem;
            color: white;
          }

          [data-self-hosted-start] .method-button-automated {
            background:
              linear-gradient(180deg, rgb(255 255 255 / 0.15), rgb(255 255 255 / 0.03) 46%, rgb(0 0 0 / 0.1)),
              linear-gradient(135deg, #7b8cff 0%, #5865f2 52%, #4652d9 100%);
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.18),
              inset 0 -1px 0 rgb(0 0 0 / 0.14),
              0 5px 12px rgb(88 101 242 / 0.2);
          }

          [data-self-hosted-start] .method-button-manual {
            background:
              linear-gradient(180deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.02) 44%, rgb(0 0 0 / 0.1)),
              linear-gradient(135deg, #8b73ff 0%, #6f50e8 48%, #5c38d5 100%);
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.18),
              inset 0 -1px 0 rgb(0 0 0 / 0.16),
              0 5px 12px rgb(94 62 216 / 0.2);
          }

          [data-self-hosted-start] .method-button-raspberry {
            background:
              linear-gradient(180deg, rgb(255 255 255 / 0.13), rgb(255 255 255 / 0.03) 46%, rgb(0 0 0 / 0.12)),
              linear-gradient(135deg, #71717a 0%, #52525b 52%, #3f3f46 100%);
            box-shadow:
              inset 0 1px 0 rgb(255 255 255 / 0.16),
              inset 0 -1px 0 rgb(0 0 0 / 0.16),
              0 5px 12px rgb(63 63 70 / 0.18);
          }

          .dark [data-self-hosted-start] .method-button {
            border: 0 !important;
          }

          .dark [data-self-hosted-start] .method-button-automated {
            background: linear-gradient(135deg, #7b8cff 0%, #5865f2 52%, #4652d9 100%);
            box-shadow: 0 5px 12px rgb(88 101 242 / 0.22);
          }

          .dark [data-self-hosted-start] .method-button-manual {
            background: linear-gradient(135deg, #8b73ff 0%, #6f50e8 48%, #5c38d5 100%);
            box-shadow: 0 5px 12px rgb(94 62 216 / 0.22);
          }

          .dark [data-self-hosted-start] .method-button-raspberry {
            background: linear-gradient(135deg, #71717a 0%, #52525b 52%, #3f3f46 100%);
            box-shadow: 0 5px 12px rgb(63 63 70 / 0.22);
          }
        `}
      </style>

      <section className="rounded-lg border border-fd-border bg-fd-background/70">
        <SectionHeader id="short-version" icon={ArrowsRight} title="The short version" />
        <div className="space-y-4 p-4 text-sm leading-6 text-fd-muted-foreground sm:p-5">
          <p className="m-0">
            Coolify needs 2 CPU cores, 2 GB RAM, and 10 GB disk space to run. If your server meets
            this specification, you can install Coolify by using this install script:
          </p>
          <div className="my-5">
            <DynamicCodeBlock
              lang="sh"
              code="curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash"
              codeblock={{ className: 'my-0' }}
            />
          </div>
          <p className="m-0">
            Once the installation completes, it will print the next steps in your terminal, so
            follow them.
          </p>
        </div>
      </section>
    </div>
  );
}

function InstallMethodCards({ methods, gridClassName }: { methods: typeof installMethods; gridClassName: string }) {
  return (
    <section className="overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
      <div className={`grid gap-4 p-4 sm:p-5 ${gridClassName}`}>
        {methods.map((method) => {
          const Icon = method.icon;

          return (
            <a
              key={method.title}
              href={method.href}
              onClick={(event) => openInstallMethodTab(event, method)}
              className={`method-card method-card-${method.variant} group rounded-lg border border-fd-border bg-fd-background/70 p-5 shadow-sm transition duration-200 hover:-translate-y-1`}
            >
              <article className="flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-fd-border bg-fd-muted/40 text-fd-foreground transition-colors group-hover:bg-fd-muted/60">
                    <Icon className="size-5" weight="Filled" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="m-0 text-base font-semibold text-fd-foreground">{method.title}</h3>
                  </div>
                </div>

                <p className="m-0 mt-4 text-sm leading-6 text-fd-muted-foreground">
                  {method.detail}
                </p>

                <ul className="m-0 mt-4 space-y-2 p-0">
                  {method.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm leading-6 text-fd-muted-foreground">
                      <Check className="mt-1 size-4 shrink-0 text-fd-foreground" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <span className={`method-button method-button-${method.variant} mt-5 inline-flex w-fit items-center gap-2 border px-3 py-2 text-sm font-semibold transition`}>
                  {method.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </article>
            </a>
          );
        })}
      </div>
    </section>
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
        methods={installMethods.filter((method) => method.variant !== 'raspberry')}
        gridClassName="lg:grid-cols-2"
      />
    </div>
  );
}

export function SelfHostedBeforeBeginTable() {
  return (
    <section data-self-hosted-start className="not-prose my-5 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
      <div className="relative overflow-auto prose-no-margin">
        <table className="comparison-table w-full min-w-[42rem] sm:min-w-0 text-sm">
          <thead>
            <tr className="comparison-header">
              <th className="w-[36%] font-semibold text-fd-muted-foreground">Section</th>
              <th className="w-[64%] font-semibold text-fd-foreground">Check</th>
            </tr>
          </thead>
          <tbody>
            {beforeBeginSections.map((item, index) => (
              <tr key={item.section}>
                <td className="font-medium text-fd-foreground">
                  <a href={item.href} className="font-semibold text-fd-foreground underline decoration-fd-primary decoration-2 underline-offset-4 hover:decoration-fd-primary/70">
                    {index + 1}. {item.section}
                  </a>
                </td>
                <td className="leading-6 text-fd-muted-foreground">{item.check}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function SelfHostedSupportedOperatingSystems() {
  return (
    <div data-self-hosted-start className="not-prose my-6 space-y-4">
      <section className="overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
        <div className="relative overflow-auto prose-no-margin">
          <table className="comparison-table w-full min-w-[42rem] sm:min-w-0 text-sm">
            <thead>
              <tr className="comparison-header">
                <th className="w-[24%] font-semibold text-fd-muted-foreground">Base</th>
                <th className="w-[44%] font-semibold text-fd-foreground">
                  <div className="flex items-center gap-2">
                    <Layers className="size-4" weight="Filled" aria-hidden="true" />
                    <span>Distributions</span>
                  </div>
                </th>
                <th className="w-[32%] font-semibold text-fd-foreground">
                  <div className="flex items-center gap-2">
                    <Notes2 className="size-4" weight="Filled" aria-hidden="true" />
                    <span>Notes</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {supportedOperatingSystems.map((os) => (
                <tr key={os.base}>
                  <td className="font-medium text-fd-foreground">{os.base}</td>
                  <td className="leading-6 text-fd-muted-foreground">{os.distributions}</td>
                  <td className="leading-6 text-fd-muted-foreground">{os.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-fd-border bg-fd-background/70">
        <SectionHeader id="operating-system-support" icon={Layers} title="Operating system support" />
        <div className="space-y-4 p-4 text-sm leading-6 text-fd-muted-foreground sm:p-5">
          <p className="m-0">
            The table above reflects distributions where Coolify is known to run well, based on
            project testing and community reports.
          </p>
          <p className="m-0 pt-2">
            Coolify only runs on Linux-based operating systems. You may be able to run it on a
            non-Linux OS by using tools like Linux virtual machines.
          </p>
        </div>
      </section>
    </div>
  );
}

export function SelfHostedMinimumHardwareRequirements() {
  return (
    <div data-self-hosted-start className="not-prose my-6 space-y-4">
      <section className="overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
        <div className="relative overflow-auto prose-no-margin">
          <table className="comparison-table w-full min-w-[42rem] sm:min-w-0 text-sm">
            <thead>
              <tr className="comparison-header">
                <th className="w-[22%] font-semibold text-fd-muted-foreground">Item</th>
                <th className="w-[26%] font-semibold text-fd-foreground">
                  <div className="flex items-center gap-2">
                    <ArrowsDown className="size-4" weight="Filled" aria-hidden="true" />
                    <span>Minimum</span>
                  </div>
                </th>
                <th className="w-[52%] font-semibold text-fd-foreground">
                  <div className="flex items-center gap-2">
                    <Notes2 className="size-4" weight="Filled" aria-hidden="true" />
                    <span>Notes</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {hardwareRequirements.map((requirement) => (
                <tr key={requirement.item}>
                  <td className="font-medium text-fd-foreground">{requirement.item}</td>
                  <td className="leading-6 text-fd-muted-foreground">{requirement.minimum}</td>
                  <td className="leading-6 text-fd-muted-foreground">{requirement.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-fd-border bg-fd-background/70">
        <SectionHeader id="hardware-resource-planning" icon={SackDollar} title="Hardware resource planning for budget users" />
        <div className="p-4 text-sm leading-6 text-fd-muted-foreground sm:p-5">
          <p className="m-0">
            Coolify can run on smaller servers (for example: 1 CPU core, 512 MB RAM, 4 GB disk),
            but this is not recommended.
          </p>
          <p className="m-0 mt-3">
            If cost is a concern, start with a server 1 CPU core and 1 GB RAM, and upgrade the
            server as your workloads grow or if it becomes slow due to limited resources.
          </p>
          <p className="m-0 mt-4">
            If you’re running both builds and Coolify on the same server, monitor your resource
            usage. High resource usage could make your server unresponsive.
          </p>
        </div>
      </section>
    </div>
  );
}

export function SelfHostedRaspberryPrerequisites() {
  return (
    <section data-self-hosted-start className="not-prose my-5 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
      <div className="relative overflow-auto prose-no-margin">
        <table className="comparison-table w-full min-w-[36rem] sm:min-w-0 text-sm">
          <thead>
            <tr className="comparison-header">
              <th className="w-[42%] font-semibold text-fd-muted-foreground">
                <div className="flex items-center gap-2">
                  <Flash12 className="size-4" weight="Filled" aria-hidden="true" />
                  <span>Model</span>
                </div>
              </th>
              <th className="w-[58%] font-semibold text-fd-foreground">
                <div className="flex items-center gap-2">
                  <Checklist2 className="size-4" weight="Filled" aria-hidden="true" />
                  <span>Notes</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {raspberryPrerequisites.map((item) => (
              <tr key={item.model}>
                <td className="font-medium text-fd-foreground">{item.model}</td>
                <td className="leading-6 text-fd-muted-foreground">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
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

      <section className="mt-4 rounded-lg border border-fd-border bg-fd-background/70">
        <SectionHeader id="fresh-server-recommended" icon={StarSparkle} title="Fresh server recommended" />
        <div className="p-4 text-sm leading-6 text-fd-muted-foreground sm:p-5">
          It’s best to use a fresh server for Coolify to avoid any conflicts with existing
          applications.
        </div>
      </section>

      <section className="mt-4 rounded-lg border border-fd-border bg-fd-background/70">
        <SectionHeader id="server-provider" icon={ServerCloud} title="Server provider" />
        <div className="p-4 text-sm leading-6 text-fd-muted-foreground sm:p-5">
          If you haven’t picked a server provider yet, consider using{' '}
          <a className="font-semibold text-fd-foreground underline decoration-fd-primary decoration-2 underline-offset-4 hover:decoration-fd-primary/70" href="https://coolify.io/hetzner">
            Hetzner
          </a>
          . You can even use our{' '}
          <a className="font-semibold text-fd-foreground underline decoration-fd-primary decoration-2 underline-offset-4 hover:decoration-fd-primary/70" href="https://coolify.io/hetzner">
            referral link
          </a>{' '}
          to support the project.
        </div>
      </section>
    </div>
  );
}

export function SelfHostedProjectResources() {
  return (
    <section data-self-hosted-start className="not-prose my-6 rounded-lg border border-fd-border bg-fd-background/70">
      <SectionHeader id="example-production-setup" icon={ServerCloud} title="Example production setup" />
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
    </section>
  );
}

export function SelfHostedFirewallSshBasics() {
  return (
    <section data-self-hosted-start className="not-prose my-5 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
        {firewallSshGuides.map((guide) => {
          const Icon = guide.icon;

          return (
            <a
              key={guide.title}
              href={guide.href}
              className={`method-card method-card-${guide.variant} group rounded-lg border border-fd-border bg-fd-background/70 p-5 shadow-sm transition duration-200 hover:-translate-y-1`}
            >
              <article className="flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-fd-border bg-fd-muted/40 text-fd-foreground transition-colors group-hover:bg-fd-muted/60">
                    <Icon className="size-5" weight="Filled" aria-hidden="true" />
                  </span>
                  <h3 className="m-0 text-base font-semibold text-fd-foreground">{guide.title}</h3>
                </div>

                <p className="m-0 mt-4 text-sm leading-6 text-fd-muted-foreground">
                  {guide.detail}
                </p>

                <ul className="m-0 mt-4 space-y-2 p-0">
                  {guide.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm leading-6 text-fd-muted-foreground">
                      <Check className="mt-1 size-4 shrink-0 text-fd-foreground" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <span className={`method-button method-button-${guide.variant} mt-5 inline-flex w-fit items-center gap-2 border px-3 py-2 text-sm font-semibold transition`}>
                  {guide.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </article>
            </a>
          );
        })}
      </div>
    </section>
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
  const Icon = guide.icon;

  return (
    <section data-self-hosted-start className="not-prose overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
      <style>
        {`
          [data-self-hosted-start] .section-header {
            background: rgb(255 255 255 / 0.035);
          }

          html:not(.dark) [data-self-hosted-start] .section-header {
            background: rgb(0 0 0 / 0.045);
          }
        `}
      </style>
      <SectionHeader id={guide.id} icon={Icon} title={guide.title} />
      <div className="p-4 sm:p-5">
        <p className="m-0 text-sm leading-6 text-fd-muted-foreground">{guide.summary}</p>
      </div>
      <div className="grid gap-0 border-t border-fd-border lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-fd-border p-4 lg:border-b-0 lg:border-e sm:p-5">
          <div className="space-y-0">
            {guide.steps.map((step, index) => (
              <div key={step} className="relative flex gap-3 pb-5 last:pb-0">
                {index < guide.steps.length - 1 ? (
                  <span className="absolute left-[0.8125rem] top-7 h-[calc(100%-1.75rem)] w-px bg-fd-border" aria-hidden="true" />
                ) : null}
                <span className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-fd-border bg-fd-background text-xs font-semibold text-fd-foreground">
                  {index + 1}
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="m-0 text-sm font-semibold leading-6 text-fd-foreground">
                    {step === 'Visit http://<server-ip-here>:8000' ? (
                      <>
                        Visit{' '}
                        <code className="rounded-md border border-fd-border bg-fd-muted px-1.5 py-0.5 text-xs font-semibold text-fd-foreground">
                          http://&lt;server-ip-here&gt;:8000
                        </code>
                      </>
                    ) : step === 'Back up /data/coolify/source/.env' ? (
                      <>
                        Back up{' '}
                        <code className="rounded-md border border-fd-border bg-fd-muted px-1.5 py-0.5 text-xs font-semibold text-fd-foreground">
                          /data/coolify/source/.env
                        </code>
                      </>
                    ) : (
                      step
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <ul className="m-0 space-y-2 p-0">
            {guide.focus.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-6 text-fd-muted-foreground">
                <Check className="mt-1 size-4 shrink-0 text-fd-foreground" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="m-0 mt-5 text-sm leading-6 text-fd-muted-foreground">{guide.result}</p>
        </div>
      </div>
    </section>
  );
}

export function SelfHostedManualAdvancedNotice() {
  return (
    <section data-self-hosted-start className="not-prose my-5 rounded-lg border border-fd-border bg-fd-background/70">
      <SectionHeader id="manual-custom-setup" icon={Setting2} title="Planning a custom manual setup?" />
      <div className="p-4 text-sm leading-6 text-fd-muted-foreground sm:p-5">
        If you want to install Coolify with a non-root user, custom Docker network, custom registry
        source, or compose overrides, review the{' '}
        <a
          className="font-semibold text-fd-foreground underline decoration-fd-primary decoration-2 underline-offset-4 hover:decoration-fd-primary/70"
          href="#advanced-installations"
        >
          Advanced installations
        </a>{' '}
        section before following the manual setup steps below.
      </div>
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
              className="method-card method-card-manual group rounded-lg border border-fd-border bg-fd-muted/20 p-4 shadow-sm transition duration-200 hover:-translate-y-1"
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
    <section data-self-hosted-start className="not-prose my-6 rounded-lg border border-fd-border bg-fd-background/70">
      <SectionHeader id="advanced-install-options" icon={Setting2} title="Advanced install options" />
      <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-2">
        {advancedOptions.map((option) => {
          const Icon = option.icon;

          return (
            <a
              key={option.title}
              href={option.href}
              onClick={(event) => openAdvancedOptionTab(event, option)}
              className="method-card method-card-manual group flex gap-3 rounded-lg border border-fd-border bg-fd-muted/20 p-4 shadow-sm transition duration-200 hover:-translate-y-1"
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
    </section>
  );
}
