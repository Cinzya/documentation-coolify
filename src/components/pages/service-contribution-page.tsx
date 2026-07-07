'use client';

import type React from 'react';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import {
  ArrowsRight,
  Check,
  Checklist2,
  Clipboard,
  Database,
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

function InlineValue({ children }: { children: React.ReactNode }) {
  return <span className="font-sans font-semibold text-fd-foreground">{children}</span>;
}

const templateMetadata = [
  ['documentation', 'Link to the official service documentation.'],
  ['slogan', 'Short description shown in Coolify.'],
  ['category', 'One broad app type, written as a single word.'],
  ['tags', 'Comma-separated search terms.'],
  ['logo', 'Path to the service logo, for example svgs/example.svg.'],
  ['port', 'Main entrypoint port for the service.'],
];

const docsFrontmatter = [
  ['title', 'yes', 'Display name shown on the service card.'],
  ['description', 'yes', 'Short description used on cards and search results.'],
  ['category', 'yes', 'Category used by the overview and generated all-services page.'],
  ['icon', 'optional', 'Only set this if automatic logo resolution cannot find the logo.'],
  ['og.description', 'optional', 'Longer social and SEO description.'],
  ['disabled', 'optional', 'Set true to hide the service from listings while keeping the page reachable.'],
];

const pullRequestChecklist = [
  <>
    Open the template pull request against the Coolify repository's <InlineValue>next</InlineValue> branch.
  </>,
  <>
    Add <InlineValue>templates/compose/&lt;service&gt;.yaml</InlineValue>.
  </>,
  <>
    Add <InlineValue>svgs/&lt;service&gt;.svg</InlineValue> and reference that same path in the compose metadata.
  </>,
  'Test the template through the Docker Compose Empty deployment flow.',
  'Open the matching service docs pull request in this repository; it is required before the template PR can be merged.',
  'Link the docs pull request from the template pull request so reviewers can check both together.',
];

const serviceDocsChecklist = [
  <>
    Add the service logo under <InlineValue>public/images/services</InlineValue>.
  </>,
  <>
    Create <InlineValue>content/docs/services/&lt;service-slug&gt;.mdx</InlineValue>.
  </>,
  'Use lowercase kebab-case for the slug and filename.',
  'Run the service generators or let dev/build run them for you.',
  'Verify the service card, category filter, and all-services entry.',
];

const faqItems = [
  {
    question: 'Can any service be added?',
    answer: 'No. The upstream service repository must have at least 1,000 GitHub stars before it can be added as a one-click service.',
  },
  {
    question: 'Why is the port required?',
    answer: 'Caddy cannot always detect the correct service port automatically. The metadata port tells Coolify what to expose.',
  },
  {
    question: 'Should I edit generated service-list files manually?',
    answer: 'No. Service listings are generated from service docs frontmatter and refreshed by the generator scripts.',
  },
  {
    question: 'Where do I request a service instead of adding one?',
    answer: 'Use the service template request category in GitHub Discussions. Search first, then upvote an existing request or create a new one.',
  },
];

const nextGuides = [
  {
    title: 'Coolify Core',
    href: '/docs/contribute/coolify',
    icon: StarSparkle,
    cta: 'View core guide',
    description: 'Set up local development and prepare code contributions for the main Coolify repository.',
    bullets: ['Local stack setup', 'Development tools', 'Pull request expectations'],
  },
  {
    title: 'Documentation',
    href: '/docs/contribute/documentation',
    icon: DocumentText2,
    cta: 'View docs guide',
    description: 'Add or improve docs pages while following the existing MDX and component patterns.',
    bullets: ['Docs setup', 'Image paths', 'Review expectations'],
  },
];

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  return <DynamicCodeBlock lang={lang} code={code} codeblock={{ className: 'my-3' }} />;
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

export function ServiceContributionPage() {
  return (
    <div data-service-contribution-page data-cool-docs className="not-prose my-8 space-y-6">
      <style>
        {`
          body:has([data-service-contribution-page]) #nd-toc {
            display: none;
          }
        `}
      </style>

      <CoolCallout id="short-version" icon={ArrowsRight} title="The short version">
        <p>
          Add the compose file and logo, test it through <strong>Docker Compose Empty</strong>, open the
          template pull request against <InlineValue>next</InlineValue>, and open the matching service docs
          pull request before the template can be merged.
        </p>
      </CoolCallout>

      <CoolCallout
        id="eligibility"
        icon={Warning22}
        title="Eligibility"
        className="[&>#eligibility]:text-amber-500 dark:[&>#eligibility]:text-amber-400"
      >
        <p>
          The service repository must have at least <strong>1,000 GitHub stars</strong> before it can be added
          to Coolify as a one-click service.
        </p>
      </CoolCallout>

      <SectionDivider />

      <CoolFlow
        id="template-flow"
        icon={Package}
        title="Add the service template"
        summary="Start with a normal Docker Compose file, then add the metadata and Coolify-specific variables that make it work as a one-click service."
        steps={[
          'Add metadata at the top of the compose file',
          'Write the Docker Compose services',
          'Use required variables for critical configuration',
          'Add the service logo in the Coolify repository',
          'Test with Docker Compose Empty',
          'Open the template pull request to Coolify',
          'Open the required service docs pull request',
        ]}
        checklist={[
          <>
            Read the{' '}
            <a href="/docs/knowledge-base/docker/compose#coolifys-magic-environment-variables" className={textLinkClassName}>
              Docker Compose magic variables guide
            </a>
            .
          </>,
          'Use generated variables and storage handling where possible.',
          'Keep the template focused on a working default deployment.',
          'Document anything the user must configure before deployment.',
        ]}
      />

      <SectionDivider />

      <CoolCallout id="metadata" icon={Checklist2} title="Metadata" contentClassName="!p-0">
        <div className="p-4 sm:p-5">
          <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
            Add metadata as comments at the top of the compose file.
          </p>
          <CodeBlock
            lang="yaml"
            code={`# documentation: https://docs.example.com/
# slogan: A brief description of your service
# category: One word, broad app type
# tags: tag1,tag2,tag3
# logo: svgs/your-service.svg
# port: 1234`}
          />
        </div>
        <div className="border-t border-fd-border p-4 sm:p-5">
          <CoolTable
            className="my-0"
            columns={[
              { header: 'Field', icon: Checklist2 },
              { header: 'Expectation', icon: DocumentText2 },
            ]}
            rows={templateMetadata}
            noWrapColumns={[0]}
          />
        </div>
      </CoolCallout>

      <CoolCallout
        id="port-note"
        icon={Warning22}
        title="Port note"
        className="[&>#port-note]:text-amber-500 dark:[&>#port-note]:text-amber-400"
      >
        <p>Always specify a port. Caddy proxy cannot automatically determine every service port.</p>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="compose" icon={Database} title="Docker Compose" contentClassName="!p-0">
        <div className="p-4 sm:p-5">
          <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
            Use Coolify magic variables for generated values, storage, and user-provided configuration.
          </p>
          <CodeBlock
            lang="yaml"
            code={`services:
  app:
    image: your-service-image:tag
    environment:
      - DATABASE_URL=\${COOLIFY_DATABASE_URL}
    volumes:
      - \${COOLIFY_VOLUME_APP}:/data`}
          />
        </div>
        <div className="border-t border-fd-border p-4 sm:p-5">
          <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
            Mark critical configuration as required so users understand what must be set before deployment.
          </p>
          <CodeBlock
            lang="yaml"
            code={`services:
  app:
    image: your-service:1.2.3
    environment:
      # Required - must be set by the user
      - DATABASE_URL=\${DATABASE_URL:?}
      - API_KEY=\${API_KEY:?}

      # Required with sensible defaults
      - PORT=\${PORT:?8080}
      - LOG_LEVEL=\${LOG_LEVEL:?info}

      # Optional with fallback values
      - DEBUG=\${DEBUG:-false}
      - CACHE_TTL=\${CACHE_TTL:-3600}`}
          />
          <p className="m-0 mt-3 text-sm leading-6 text-fd-muted-foreground">
            Do not use <InlineValue>latest</InlineValue> or other floating tags. Pin the image to a specific version.
          </p>
        </div>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout
        id="logo-and-test"
        icon={Image}
        title="Logo and testing"
        contentClassName="!p-0"
      >
        <div className="p-4 sm:p-5">
          <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
            Put the logo in the Coolify repository and reference it from the compose metadata, then test the compose file before opening the pull request.
          </p>
        </div>
        <div className="border-t border-fd-border p-4 sm:p-5">
          <BulletList
            items={[
              <>
                Example: a service named <InlineValue>wordpress</InlineValue> should use{' '}
                <InlineValue>templates/compose/wordpress.yaml</InlineValue>,{' '}
                <InlineValue>svgs/wordpress.svg</InlineValue>, and{' '}
                <InlineValue># logo: svgs/wordpress.svg</InlineValue>.
              </>,
              'Prefer SVG logos. Use WebP or PNG only when SVG is unavailable.',
              'Avoid low-quality JPG logos.',
              'Test from a fresh Docker Compose Empty resource, not only an already-running local container.',
              'Confirm the service starts and the exposed port works.',
            ]}
          />
        </div>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="pull-request" icon={Clipboard} title="Pull request checklist">
        <BulletList items={pullRequestChecklist} />
      </CoolCallout>

      <CoolCallout id="generated-template-note" icon={Rocket} title="Generated template data">
        <p>
          Coolify deploys from <InlineValue>templates/service-templates.json</InlineValue>, a parsed list generated from the
          compose templates in the Coolify repository. You do not need to edit that JSON file directly.
        </p>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="service-docs" icon={DocumentText2} title="Add service documentation" contentClassName="!p-0">
        <div className="p-4 sm:p-5">
          <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
            Open a matching docs page pull request in this repository before the service template pull request is merged.
          </p>
        </div>
        <div className="border-t border-fd-border p-4 sm:p-5">
          <BulletList items={serviceDocsChecklist} />
        </div>
        <div className="border-t border-fd-border p-4 sm:p-5">
          <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
            Start the docs page with this frontmatter. Keep the description short so cards and search results stay readable.
          </p>
          <CodeBlock
            lang="yaml"
            code={`---
title: "Service Name"
description: "Short service description for cards and search."
og:
  description: "SEO/social-card description."
category: "Analytics"
icon: "/images/services/service-name-logo.svg"
---`}
          />
        </div>
        <div className="border-t border-fd-border p-4 sm:p-5">
          <CoolTable
            className="my-0"
            columns={[
              { header: 'Field', icon: Checklist2 },
              { header: 'Required', icon: Warning22 },
              { header: 'Notes', icon: DocumentText2 },
            ]}
            rows={docsFrontmatter}
            noWrapColumns={[0, 1]}
          />
        </div>
        <div className="border-t border-fd-border p-4 sm:p-5">
          <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
            To hide a service from generated listings while keeping the page reachable, include the disabled field in
            the service page frontmatter:
          </p>
          <CodeBlock
            lang="yaml"
            code={`---
title: "Service Name"
description: "Short service description for cards and search."
category: "Analytics"
disabled: true
---`}
          />
        </div>
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="docs-template" icon={DocumentText2} title="Service docs starter">
        <p>Use this as a small starting point for the service page body.</p>
        <CodeBlock
          lang="markdown"
          code={`# Service Name

![Service Name](/images/services/service-name-logo.svg)

## What is Service Name?

Brief description and use cases.

## Links

- [Official website](https://example.com?utm_source=coolify.io)
- [GitHub](https://github.com/example/repo?utm_source=coolify.io)`}
        />
        <p className="m-0 mt-4 text-sm leading-6 text-fd-muted-foreground">
          Add screenshots with the zoomable image component when the image benefits from a larger view:
        </p>
        <CodeBlock
          lang="tsx"
          code={'<ZoomImage src="/images/services/service-name-dashboard.webp" alt="Service dashboard" />'}
        />
        <p className="m-0 mt-3 text-sm leading-6 text-fd-muted-foreground">
          Do not use <InlineValue>ZoomImage</InlineValue> for the logo.
        </p>
      </CoolCallout>

      <CoolCallout id="regenerate-listings" icon={Rocket} title="Regenerate listings">
        <p>
          The services overview and all-services directory are generated from service frontmatter. The generators
          run during dev and build, but you can run them directly when checking a service page.
        </p>
        <CodeBlock code="bun run generate:services" />
      </CoolCallout>

      <SectionDivider />

      <CoolCallout id="request-service" icon={MessageQuestion2} title="Request a new service">
        <p>
          If you want a service template but are not submitting it yourself, search the{' '}
          <a
            href="https://github.com/coollabsio/coolify/discussions/categories/service-template-requests"
            className={textLinkClassName}
          >
            service template requests
          </a>{' '}
          first. Upvote an existing request, or create a new one if it does not exist.
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
