'use client';

import type React from 'react';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import {
  ArrowsRight,
  BranchUp,
  BrowserTerminal,
  Check,
  Checklist2,
  Clipboard,
  Database,
  DocumentText2,
  Key,
  Monitor,
  Package,
  Rocket,
  Settings,
  TerminalSquare,
  Warning22,
} from 'reicon-react';
import { CoolActionCard } from '@/components/docs/cool-action-card';
import { CoolCallout } from '@/components/docs/cool-callout';
import { CoolFlow } from '@/components/docs/cool-flow';
import { CoolTable } from '@/components/docs/cool-table';

const textLinkClassName =
  'font-semibold text-fd-foreground underline decoration-fd-primary underline-offset-4';

const operatingSystems = [
  {
    title: 'Windows',
    summary: 'Use WSL2 with Docker CE for the closest Linux development experience.',
    items: [
      <>
        Install{' '}
        <a href="https://learn.microsoft.com/en-us/windows/wsl/install?ref=coolify" className={textLinkClassName}>
          WSL2
        </a>{' '}
        with a Linux distribution such as Ubuntu.
      </>,
      <>
        Install{' '}
        <a href="https://docs.docker.com/engine/install/?ref=coolify" className={textLinkClassName}>
          Docker Engine
        </a>{' '}
        inside WSL2, or use{' '}
        <a href="https://docs.docker.com/desktop/install/windows-install/?ref=coolify" className={textLinkClassName}>
          Docker Desktop
        </a>{' '}
        with the WSL2 backend enabled.
      </>,
      <>
        Install{' '}
        <a
          href="https://serversideup.net/open-source/spin/docs/installation/install-windows#download-and-install-spin-into-wsl2?ref=coolify"
          className={textLinkClassName}
        >
          Spin for Windows
        </a>
        .
      </>,
    ],
  },
  {
    title: 'macOS',
    summary: 'OrbStack is recommended because it is lighter than Docker Desktop for local development.',
    items: [
      <>
        Install{' '}
        <a href="https://docs.orbstack.dev/quick-start#installation?ref=coolify" className={textLinkClassName}>
          OrbStack
        </a>{' '}
        or{' '}
        <a href="https://docs.docker.com/desktop/install/mac-install/?ref=coolify" className={textLinkClassName}>
          Docker Desktop for Mac
        </a>
        .
      </>,
      <>
        Install{' '}
        <a
          href="https://serversideup.net/open-source/spin/docs/installation/install-macos/#download-and-install-spin?ref=coolify"
          className={textLinkClassName}
        >
          Spin for macOS
        </a>
        .
      </>,
      'If permission errors appear when starting the stack, try running Spin with sudo.',
    ],
  },
  {
    title: 'Linux',
    summary: 'Docker Engine is recommended because it avoids the extra VM layer.',
    items: [
      <>
        Install{' '}
        <a href="https://docs.docker.com/engine/install/?ref=coolify" className={textLinkClassName}>
          Docker Engine
        </a>{' '}
        for your distribution, or use{' '}
        <a href="https://docs.docker.com/desktop/install/linux-install/?ref=coolify" className={textLinkClassName}>
          Docker Desktop for Linux
        </a>{' '}
        if you want a GUI.
      </>,
      <>
        Install{' '}
        <a
          href="https://serversideup.net/open-source/spin/docs/installation/install-linux#configure-docker-permissions?ref=coolify"
          className={textLinkClassName}
        >
          Spin for Linux
        </a>
        .
      </>,
      'Make sure your user can run Docker commands without restarting the setup flow repeatedly.',
    ],
  },
];

const developmentTools = [
  ['Coolify app', 'http://localhost:8000', 'Use test@example.com and password.'],
  ['Laravel Horizon', 'http://localhost:8000/horizon', 'Only available when logged in as the root user.'],
  ['Mailpit', 'http://localhost:8025', 'Catch local development emails.'],
  ['Telescope', 'http://localhost:8000/telescope', 'Disabled by default; enable it with TELESCOPE_ENABLED=true.'],
];

const localCoolifyUrl = 'http://localhost:8000';
const localCoolifyUsername = 'test@example.com';

const pullRequestChecklist = [
  'Commit and push your changes to your fork.',
  'Open the pull request against the Coolify repository.',
  <>
    Set the base branch to <code>next</code>, not <code>v4.x</code>.
  </>,
  'Manually test the changed flow in the local app, not only through test files.',
  'Fill in the pull request template with the details maintainers need.',
  'Move the pull request out of draft as soon as it is ready for review.',
];

type ResetStepItem = {
  note: React.ReactNode;
  title: string;
};

const resetSteps: ResetStepItem[] = [
  { title: 'Stop the running Spin process', note: 'Press Ctrl+C in the terminal where Spin is running.' },
  {
    title: 'Remove development containers',
    note: <CommandBlock command="docker rm coolify coolify-db coolify-redis coolify-realtime coolify-testing-host coolify-minio coolify-vite-1 coolify-mail" />,
  },
  {
    title: 'Remove development volumes',
    note: (
      <>
        <CommandBlock command="docker volume rm coolify_dev_backups_data coolify_dev_postgres_data coolify_dev_redis_data coolify_dev_coolify_data coolify_dev_minio_data" />
        <p className="m-0 mt-2 text-sm leading-6 text-fd-muted-foreground">
          If your volume names do not use the <code>coolify</code> prefix, remove the prefix from the volume command before
          running it.
        </p>
      </>
    ),
  },
  { title: 'Remove unused images', note: <CommandBlock command="docker image prune -a" /> },
  { title: 'Start Coolify again', note: <CommandBlock command="spin up" /> },
  {
    title: 'Run migrations and seeders',
    note: <CommandBlock command="docker exec -it coolify php artisan migrate:fresh --seed" />,
  },
];

const nextGuides = [
  {
    title: 'Service Templates',
    href: '/docs/contribute/service',
    icon: Package,
    cta: 'View service guide',
    description: 'Add one-click service templates with the expected structure and verification.',
    bullets: ['Template structure', 'Metadata rules', 'Testing checklist'],
  },
  {
    title: 'Documentation',
    href: '/docs/contribute/documentation',
    icon: DocumentText2,
    cta: 'View docs guide',
    description: 'Improve these docs while keeping the existing writing style and component patterns.',
    bullets: ['MDX patterns', 'Docs structure', 'Review expectations'],
  },
];

function CommandBlock({ command }: { command: string }) {
  return <DynamicCodeBlock lang="bash" code={command} codeblock={{ className: 'my-3' }} />;
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="m-0 space-y-2 p-0">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2 text-sm leading-6 text-fd-muted-foreground">
          <Check className="mt-1 size-4 shrink-0 text-fd-foreground" aria-hidden={true} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NormalBulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="m-0 list-disc space-y-2 ps-5 text-sm leading-6 text-fd-muted-foreground">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function SectionDivider() {
  return <div className="h-px bg-fd-border" aria-hidden={true} />;
}

function ValueCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-fd-border bg-fd-muted/20 p-3">
      <p className="m-0 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">{label}</p>
      <p className="m-0 mt-1 text-sm font-semibold text-fd-foreground">{value}</p>
    </div>
  );
}

function ResetStep({ index, note, title }: { index: number; note: React.ReactNode; title: string }) {
  return (
    <div className="relative flex gap-3 pb-5 last:pb-0">
      {index < resetSteps.length - 1 ? (
        <span className="absolute left-[0.8125rem] top-7 h-[calc(100%-1.75rem)] w-px bg-fd-border" aria-hidden={true} />
      ) : null}
      <span className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-fd-border bg-fd-background text-xs font-semibold text-fd-foreground">
        {index + 1}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="m-0 text-sm font-semibold leading-6 text-fd-foreground">{title}</p>
        {typeof note === 'string' ? (
          <p className="m-0 mt-1 text-sm leading-6 text-fd-muted-foreground">{note}</p>
        ) : (
          note
        )}
      </div>
    </div>
  );
}

export function CoolifyContributionPage() {
  return (
    <div data-coolify-contribution-page data-cool-docs className="not-prose my-8 space-y-6">
      <style>
        {`
          body:has([data-coolify-contribution-page]) #nd-toc {
            display: none;
          }
        `}
      </style>

      <CoolCallout id="short-version" icon={ArrowsRight} title="The short version">
        <p>
          Set up Docker, Spin, and a local fork of{' '}
          <a href="https://github.com/coollabsio/coolify" className={textLinkClassName}>
            coollabsio/coolify
          </a>
          . Start the stack with <code>spin up</code>, test at <strong>http://localhost:8000</strong>,
          and open pull requests against the <code>next</code> branch.
        </p>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="setup-development-environment" icon={Monitor} title="Setup development environment" contentClassName="!p-0">
        <Accordions type="multiple" className="border-0">
          {operatingSystems.map((os) => (
            <Accordion key={os.title} title={os.title}>
              <p className="m-0 mb-3 text-sm leading-6 text-fd-muted-foreground">{os.summary}</p>
              <NormalBulletList items={os.items} />
            </Accordion>
          ))}
        </Accordions>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="verify-installation" icon={Checklist2} title="Verify installation">
        <p>After installing Docker or OrbStack and Spin, confirm both commands are available.</p>
        <CommandBlock command={'docker --version\nspin --version'} />
      </CoolCallout>

      <SectionDivider />

      <CoolFlow
        id="local-repository"
        icon={BranchUp}
        title="Fork and setup local repository"
        summary="Work from your own fork, then open a pull request back to Coolify when the change is ready."
        steps={[
          <>
            Fork the{' '}
            <a href="https://github.com/coollabsio/coolify" className={textLinkClassName}>
              Coolify repository
            </a>
          </>,
          'Clone your fork locally',
          'Open the repository in your code editor',
          'Keep each change focused on one issue or feature',
        ]}
        checklist={[
          <>
            You can clone with Git, or use{' '}
            <a href="https://desktop.github.com/?ref=coolify" className={textLinkClassName}>
              GitHub Desktop
            </a>
            .
          </>,
          <>
            Editors that work well include{' '}
            <a href="https://code.visualstudio.com/download?ref=coolify" className={textLinkClassName}>
              VS Code
            </a>
            ,{' '}
            <a href="https://www.cursor.com/?ref=coolify" className={textLinkClassName}>
              Cursor
            </a>
            , and{' '}
            <a href="https://zed.dev/download?ref=coolify" className={textLinkClassName}>
              Zed
            </a>
            .
          </>,
          'Use a branch name that describes the change you are making.',
        ]}
      />

      <SectionDivider />

      <CoolFlow
        id="environment-variables"
        icon={Key}
        title="Set up environment variables"
        summary="Coolify ships a development environment example file. Copy it before starting the stack."
        steps={[
          <>
            Find <code>.env.development.example</code> in the repository root
          </>,
          <>
            Duplicate it and rename the copy to <code>.env</code>
          </>,
          'Review the values and adjust them for your machine',
          'Save the file before starting Spin',
        ]}
        checklist={[
          <>
            Keep local secrets in <code>.env</code> and do not commit that file.
          </>,
          'Review the example values before starting the stack.',
          'Restart Spin after changing environment variables.',
        ]}
      />

      <SectionDivider />

      <CoolCallout id="start-coolify" icon={Rocket} title="Start Coolify">
        <p>Open a terminal in the local Coolify repository and leave the process running.</p>
        <CommandBlock command="spin up" />
        <p className="mt-4">If you hit permission errors, especially on macOS, run:</p>
        <CommandBlock command="sudo spin up" />
      </CoolCallout>

      <CoolCallout className="[&>#startup-note]:text-amber-500 dark:[&>#startup-note]:text-amber-400" id="startup-note" icon={Warning22} title="Startup note">
        <p>You may see some errors during startup. That can be expected while the development stack is booting.</p>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="start-development" icon={BrowserTerminal} title="Start development" contentClassName="!p-0">
        <div className="p-4 sm:p-5">
          <p className="m-0 text-sm leading-6 text-fd-muted-foreground">Use the seeded development account to sign in locally.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <ValueCard
              label="URL"
              value={
                <a href={localCoolifyUrl} className={textLinkClassName}>
                  {localCoolifyUrl}
                </a>
              }
            />
            <ValueCard
              label="Username"
              value={<span>{localCoolifyUsername}</span>}
            />
            <ValueCard label="Password" value={<span>password</span>} />
          </div>
        </div>
        <div className="border-t border-fd-border p-4 sm:p-5">
          <CoolTable
            className="my-0"
            columns={[
              { header: 'Tool', icon: BrowserTerminal },
              { header: 'URL', icon: TerminalSquare },
              { header: 'Note', icon: Checklist2 },
            ]}
            rows={developmentTools.map(([tool, url, note]) => [
              tool,
              <a key={url} href={url} className={textLinkClassName}>
                {url}
              </a>,
              note,
            ])}
            noWrapColumns={[1]}
          />
        </div>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="telescope" icon={Settings} title="Enable Telescope">
        <p>
          Telescope is disabled by default. Add this to your <code>.env</code> file when you need the debugging
          dashboard.
        </p>
        <CommandBlock command="TELESCOPE_ENABLED=true" />
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="pull-request" icon={Clipboard} title="Create a pull request">
        <BulletList items={pullRequestChecklist} />
      </CoolCallout>

      <CoolCallout className="[&>#draft-pull-requests]:text-amber-500 dark:[&>#draft-pull-requests]:text-amber-400" id="draft-pull-requests" icon={Warning22} title="Draft pull requests">
        <p>Pull requests that stay in draft for a long time may be closed by maintainers.</p>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="development-notes" icon={Database} title="Development notes">
        <p>Run migrations after switching branches, pulling updates, or changing database structure.</p>
        <CommandBlock command="docker exec -it coolify php artisan migrate" />
        <p className="mt-4">To reset the development database with default seed data, run:</p>
        <CommandBlock command="docker exec -it coolify php artisan migrate:fresh --seed" />
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="reset-development-environment" icon={Warning22} title="Reset development environment">
        <p>
          If the local stack or database is broken, remove the development containers and volumes,
          then start from a clean slate.
        </p>
        <div className="mt-4 space-y-0">
          {resetSteps.map((step, index) => (
            <ResetStep key={step.title} index={index} title={step.title} note={step.note} />
          ))}
        </div>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="development-guides" icon={DocumentText2} title="Development guides" contentClassName="!p-0">
        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
          {nextGuides.map((guide) => (
            <CoolActionCard
              key={guide.title}
              href={guide.href}
              icon={guide.icon}
              title={guide.title}
              variant="secondary"
              description={guide.description}
              bullets={guide.bullets}
              cta={guide.cta}
            />
          ))}
        </div>
      </CoolCallout>
    </div>
  );
}
