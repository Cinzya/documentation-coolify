'use client';

import type React from 'react';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import {
  ArrowsRight,
  Box5,
  BranchUp,
  Check,
  Checklist2,
  Code2,
  DocumentText2,
  MagicWand,
  MessageQuestion2,
  ShieldCheck,
  StarSparkle,
  Warning22,
} from 'reicon-react';
import { CoolActionCard } from '@/components/docs/cool-action-card';
import { CoolCallout } from '@/components/docs/cool-callout';
import { CoolFlow } from '@/components/docs/cool-flow';

const strongContributions = [
  'Small bug fixes with a clear reproduction path',
  'Documentation fixes that improve clarity or accuracy',
  'One-click service additions that follow the template rules',
  'Narrow code-quality improvements with tests or manual verification',
];

const avoidContributions = [
  'Major features or architectural changes without prior discussion',
  'Large UI or UX rewrites without prior discussion',
  'Broad refactors mixed into unrelated fixes',
  'Low-effort AI-generated pull requests',
  'Pull requests that target a branch other than next',
];

const formatExamples = [
  ['fix(ui):', 'UI-related fixes'],
  ['fix(api):', 'API-related fixes'],
  ['feat(api):', 'API-related additions'],
  ['feat(service):', 'One-click service changes'],
];

const faqItems = [
  {
    question: 'Should I ask before fixing a typo or small bug?',
    answer: 'No. Small, obvious fixes can be submitted directly as a pull request.',
  },
  {
    question: 'Can I open a pull request for a new feature?',
    answer: 'Discuss it first in GitHub Discussions or Discord. New features without prior alignment may be closed without review.',
  },
  {
    question: 'Can I work on an open issue?',
    answer: 'Comment first to confirm the issue is still relevant and that no one else is actively working on it.',
  },
  {
    question: 'Can I clean up code while fixing something else?',
    answer: 'Keep the pull request focused on the stated goal. Refactors and cleanup work should be discussed and submitted separately.',
  },
  {
    question: 'Can I use AI to help?',
    answer: 'Yes, but disclose it in the pull request description. You must understand, verify, and own every change.',
  },
  {
    question: 'Why was my pull request closed without detailed feedback?',
    answer: 'It usually means the change did not align with project direction, required too much review capacity, or targeted work that is not planned.',
  },
];

const developmentGuides = [
  {
    title: 'Coolify Core',
    href: '/docs/contribute/coolify',
    icon: StarSparkle,
    cta: 'View core guide',
    description: 'Set up local development and prepare code contributions for the main Coolify repository.',
    bullets: ['Local development setup', 'Code contribution flow', 'Pull request expectations'],
  },
  {
    title: 'Service Templates',
    href: '/docs/contribute/service',
    icon: Box5,
    cta: 'View service guide',
    description: 'Add one-click service templates with the expected structure, metadata, and verification.',
    bullets: ['Template requirements', 'Service metadata', 'Testing checklist'],
  },
  {
    title: 'Documentation',
    href: '/docs/contribute/documentation',
    icon: DocumentText2,
    cta: 'View docs guide',
    description: 'Improve these docs while keeping the existing writing style and component patterns.',
    bullets: ['Docs structure', 'MDX patterns', 'Review expectations'],
  },
];

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="m-0 space-y-2 p-0">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2">
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

export function ContributionGuidelinesPage({ children }: { children?: React.ReactNode }) {
  return (
    <div data-contribution-guidelines-page data-cool-docs className="not-prose my-8 space-y-6">
      <style>
        {`
          body:has([data-contribution-guidelines-page]) #nd-toc {
            display: none;
          }
        `}
      </style>

      <CoolCallout id="short-version" icon={ArrowsRight} title="The short version">
        <p>
          Coolify is used by 470K+ people and maintained by two core maintainers. Contributions
          are welcome, but alignment matters more than volume: keep changes focused, discuss larger
          work before coding, test what you submit, and target the <code>next</code> branch.
        </p>
      </CoolCallout>

      <SectionDivider />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-fd-border bg-fd-background/70 p-4">
          <p className="m-0 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">Project scale</p>
          <p className="m-0 mt-2 text-2xl font-semibold text-fd-foreground">470K+</p>
          <p className="m-0 mt-1 text-sm leading-6 text-fd-muted-foreground">people use Coolify worldwide.</p>
        </div>
        <div className="rounded-lg border border-fd-border bg-fd-background/70 p-4">
          <p className="m-0 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">Review capacity</p>
          <p className="m-0 mt-2 text-2xl font-semibold text-fd-foreground">2 core maintainers</p>
          <p className="m-0 mt-1 text-sm leading-6 text-fd-muted-foreground">actively maintain the project.</p>
        </div>
        <div className="rounded-lg border border-fd-border bg-fd-background/70 p-4">
          <p className="m-0 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">Current focus</p>
          <p className="m-0 mt-2 text-2xl font-semibold text-fd-foreground">v4 stability</p>
          <p className="m-0 mt-1 text-sm leading-6 text-fd-muted-foreground">major changes are not planned for v4.</p>
        </div>
      </section>

      <SectionDivider />

      <CoolCallout
        id="important"
        icon={Warning22}
        title="Important"
        className="[&>#important]:text-amber-500 dark:[&>#important]:text-amber-400"
      >
        <p>
          These guidelines are stricter than many open-source projects on purpose. Clear structure
          and boundaries reduce maintainer burnout and keep Coolify sustainable long term.
        </p>
      </CoolCallout>

      <SectionDivider />

      {children}

      <SectionDivider />

      <CoolCallout id="project-direction" icon={ShieldCheck} title="Project direction" contentClassName="!p-0">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="border-b border-fd-border p-4 lg:border-b-0 lg:border-e sm:p-5">
            <h3 className="m-0 text-sm font-semibold text-fd-foreground">Likely to be accepted</h3>
            <div className="mt-3 text-sm leading-6 text-fd-muted-foreground">
              <BulletList items={strongContributions} />
            </div>
          </div>
          <div className="p-4 sm:p-5">
            <h3 className="m-0 text-sm font-semibold text-fd-foreground">Discuss first or avoid</h3>
            <div className="mt-3 text-sm leading-6 text-fd-muted-foreground">
              <BulletList items={avoidContributions} />
            </div>
          </div>
        </div>
      </CoolCallout>

      <SectionDivider />

      <CoolFlow
        id="pull-request-flow"
        icon={BranchUp}
        title="Before opening a pull request"
        summary="For anything beyond a small, obvious fix, align with the maintainers before spending time on implementation."
        steps={[
          'Check existing issues and discussions',
          'Discuss larger changes before coding',
          'Keep one pull request to one logical change',
          'Test the change in a clean environment',
          'Open the pull request against the next branch',
        ]}
        checklist={[
          'Reference and close an issue or discussion when possible.',
          'Do not reformat unrelated files or fix unrelated style issues.',
          'Keep the contributor agreement in the pull request description.',
          'Include detailed testing steps so maintainers can reproduce the result.',
        ]}
      />

      <SectionDivider />

      <CoolCallout id="formats" icon={Checklist2} title="Commit and pull request format" contentClassName="!p-0">
        <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-fd-border p-4 lg:border-b-0 lg:border-e sm:p-5">
            <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
              Commit messages and pull request titles should start with an action and category. Keep
              descriptions concise; walls of text listing every small change may be rejected.
            </p>
          </div>
          <div className="divide-y divide-fd-border">
            {formatExamples.map(([prefix, description]) => (
              <div key={prefix} className="grid gap-3 p-4 sm:grid-cols-[8rem_1fr] sm:px-5">
                <code className="text-sm font-semibold text-fd-foreground">{prefix}</code>
                <span className="text-sm leading-6 text-fd-muted-foreground">{description}</span>
              </div>
            ))}
          </div>
        </div>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="ai-usage" icon={MagicWand} title="AI usage">
        <p>
          AI tools are allowed, but you must disclose AI usage in the pull request description. You
          are still responsible for understanding every change, verifying correctness, and following
          existing project patterns.
        </p>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="faq" icon={MessageQuestion2} title="FAQ" contentClassName="!p-0">
        <FaqAccordion />
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="development-guides" icon={DocumentText2} title="Development guides" contentClassName="!p-4 sm:!p-5">
        <div className="grid gap-4 lg:grid-cols-3">
          {developmentGuides.map((guide) => (
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
