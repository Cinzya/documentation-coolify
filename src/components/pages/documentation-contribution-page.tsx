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
  DocumentText2,
  Image,
  MessageQuestion2,
  Package,
  Rocket,
  StarSparkle,
  Warning22,
} from 'reicon-react';
import { CoolActionCard } from '@/components/docs/cool-action-card';
import { CoolCallout } from '@/components/docs/cool-callout';
import { CoolFlow } from '@/components/docs/cool-flow';
import { CoolTable } from '@/components/docs/cool-table';

const textLinkClassName =
  'font-semibold text-fd-foreground underline decoration-fd-primary underline-offset-4';

const repositoryUrl = 'https://github.com/coollabsio/coolify-docs';
const localDocsUrl = 'http://localhost:5173/docs/';

const writingGuidelines = [
  'Use clear, simple English for readers who may not be native English speakers.',
  'Break guides into small steps that a new self-hoster can follow without guessing.',
  'Add screenshots when they help explain a screen, setting, or expected result.',
  'Use existing docs components and nearby pages as the pattern before creating anything new.',
];

const imageRules = [
  ['Format', 'Use .webp images for documentation screenshots and illustrations.'],
  [
    'Location',
    <>
      Place image files in <code>public/images/...</code>, then reference them from MDX as{' '}
      <code>/images/...</code>.
    </>,
  ],
  ['Component', 'Use the zoomable image component to add images to docs.'],
];

const pullRequestChecklist = [
  <>
    Open the pull request against the <code>next</code> branch.
  </>,
  'Explain what page or flow changed and why.',
  'Include screenshots when the change affects visible layout or user steps.',
  'Do not commit lockfiles or package-manager files from tools other than Bun.',
  'Keep one pull request focused on one documentation change.',
];

const faqItems = [
  {
    question: 'Can I fix a typo directly?',
    answer: 'Yes. Small, obvious documentation fixes can be opened as a pull request without prior discussion.',
  },
  {
    question: 'Should I target main or next?',
    answer: 'Target next. The main branch represents production, while next is the development branch.',
  },
  {
    question: 'Can I use npm, pnpm, or yarn locally?',
    answer: 'You can use a different package manager locally, but do not include its generated files in your commit.',
  },
  {
    question: 'Where should I ask questions?',
    answer: 'Open an issue for repository-specific problems, or ask in the contribute channel on Discord.',
  },
];

const nextGuides = [
  {
    title: 'Coolify Core',
    href: '/docs/contribute/coolify',
    icon: StarSparkle,
    cta: 'View core guide',
    description: 'Set up local development and prepare code contributions for the main Coolify repository.',
    bullets: ['Local stack setup', 'Development tools', 'Reset steps'],
  },
  {
    title: 'Service Templates',
    href: '/docs/contribute/service',
    icon: Package,
    cta: 'View service guide',
    description: 'Add one-click service templates with the expected structure and verification.',
    bullets: ['Template structure', 'Metadata rules', 'Testing checklist'],
  },
];

function CommandBlock({ command, lang = 'bash' }: { command: string; lang?: string }) {
  return <DynamicCodeBlock lang={lang} code={command} codeblock={{ className: 'my-3' }} />;
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

function FaqAccordion() {
  return (
    <Accordions type="multiple" className="border-0">
      {faqItems.map((item) => (
        <Accordion key={item.question} title={item.question}>
          <p>{item.answer}</p>
        </Accordion>
      ))}
    </Accordions>
  );
}

function SectionDivider() {
  return <div className="h-px bg-fd-border" aria-hidden={true} />;
}

export function DocumentationContributionPage() {
  return (
    <div data-documentation-contribution-page data-cool-docs className="not-prose my-8 space-y-6">
      <style>
        {`
          body:has([data-documentation-contribution-page]) #nd-toc {
            display: none;
          }
        `}
      </style>

      <CoolCallout id="short-version" icon={ArrowsRight} title="The short version">
        <p>
          Fork{' '}
          <a href={repositoryUrl} className={textLinkClassName}>
            coollabsio/coolify-docs
          </a>
          , work from the <code>next</code> branch, run the docs locally with Bun, and open focused pull
          requests back to <code>next</code>.
        </p>
      </CoolCallout>

      <SectionDivider />

      <CoolFlow
        id="repository-workflow"
        icon={BranchUp}
        title="Repository workflow"
        summary="The docs follow the same branch model as Coolify: production lives on main, while new work lands in next first."
        steps={[
          'Fork the docs repository to your GitHub account',
          <>
            Clone your fork from the <code>next</code> branch
          </>,
          'Create a small branch for your documentation change',
          <>
            Open the pull request back to <code>next</code>
          </>,
        ]}
        checklist={[
          <>
            Do not open pull requests against <code>main</code>.
          </>,
          'Keep each branch focused on one docs fix, guide, or cleanup.',
          'Check nearby pages before changing structure or component patterns.',
        ]}
      />

      <SectionDivider />

      <CoolCallout id="local-development" icon={BrowserTerminal} title="Local development">
        <p>Install dependencies and start the documentation site from the repository root.</p>
        <CommandBlock command={'bun install\nbun run dev'} />
        <p className="mt-4">
          The development server starts at{' '}
          <a href={localDocsUrl} className={textLinkClassName}>
            {localDocsUrl}
          </a>
          .
        </p>
      </CoolCallout>

      <CoolCallout
        className="[&>#package-manager-note]:text-amber-500 dark:[&>#package-manager-note]:text-amber-400"
        id="package-manager-note"
        icon={Warning22}
        title="Package manager note"
      >
        <p>
          Bun is the expected package manager. If you use another tool locally, do not commit its lockfile
          or configuration files.
        </p>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="writing-content" icon={DocumentText2} title="Writing and structure">
        <BulletList items={writingGuidelines} />
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="images" icon={Image} title="Images and screenshots" contentClassName="!p-0">
        <div className="p-4 sm:p-5">
          <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
            Screenshots should make a step easier to follow, not decorate the page.
          </p>
        </div>
        <div className="border-t border-fd-border p-4 sm:p-5">
          <CoolTable
            className="my-0"
            columns={[
              { header: 'Rule', icon: Checklist2 },
              { header: 'Expectation', icon: DocumentText2 },
            ]}
            rows={imageRules}
            noWrapColumns={[0]}
          />
        </div>
        <div className="border-t border-fd-border p-4 sm:p-5">
          <p className="m-0 text-sm leading-6 text-fd-muted-foreground">Use this component for docs screenshots:</p>
          <CommandBlock lang="tsx" command={'<ZoomableImage src="/images/path-to-the-image.webp" alt="Describe the image" />'} />
          <p className="m-0 mt-4 text-sm leading-6 text-fd-muted-foreground">Example:</p>
          <CommandBlock
            lang="tsx"
            command={'<ZoomableImage src="/images/applications/domain.webp" alt="Application domain settings" />'}
          />
        </div>
      </CoolCallout>

      <SectionDivider />

      <CoolFlow
        id="pull-request-flow"
        icon={Clipboard}
        title="Submit your contribution"
        summary="Make the review easy: show what changed, why it changed, and how you checked it."
        steps={[
          'Commit and push your changes to your fork',
          <>
            Open a pull request to <code>coollabsio/coolify-docs</code>
          </>,
          <>
            Set the base branch to <code>next</code>
          </>,
          'Describe the update and add screenshots when useful',
        ]}
        checklist={pullRequestChecklist}
      />

      <SectionDivider />

      <CoolCallout id="current-docs-note" icon={Rocket} title="Current docs note">
        <p>
          The docs are actively being rewritten for better structure and clarity. Contributions that
          improve accuracy, reduce confusion, or follow the existing page patterns are especially helpful.
        </p>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="faq" icon={MessageQuestion2} title="FAQ" contentClassName="!p-0">
        <FaqAccordion />
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="development-guides" icon={DocumentText2} title="Development guides" contentClassName="!p-4 sm:!p-5">
        <div className="grid gap-4 sm:grid-cols-2">
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
              className="shadow-none"
            />
          ))}
        </div>
      </CoolCallout>
    </div>
  );
}
