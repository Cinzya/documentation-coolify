'use client';

import type React from 'react';
import { ArrowRight } from 'reicon-react';
import { CoolActionCard } from '@/components/docs/cool-action-card';
import { CoolActionCardGrid } from '@/components/docs/cool-action-card-grid';
import type { CoolIcon } from '@/components/docs/cool-types';
import { cn } from '@/lib/ui/cn';

export type FirstDeployCard = {
  bullets?: React.ReactNode[];
  description?: React.ReactNode;
  href?: string;
  icon: CoolIcon;
  title: string;
};

export type FirstDeployStep = {
  detail: React.ReactNode;
  href: string;
  icon: CoolIcon;
  title: React.ReactNode;
};

type FirstDeployCardGridProps = React.ComponentProps<'section'> & {
  cards: FirstDeployCard[];
  dataAttribute?: string;
  issueTabId?: string;
  onCardClick?: (event: React.MouseEvent<HTMLAnchorElement>, card: FirstDeployCard) => void;
  sectionProps?: React.ComponentProps<'section'>;
};

export function FirstDeployCardGrid({
  cards,
  className,
  dataAttribute,
  issueTabId,
  onCardClick,
  sectionProps,
  ...props
}: FirstDeployCardGridProps) {
  return (
    <CoolActionCardGrid
      {...props}
      {...sectionProps}
      {...(dataAttribute ? { [dataAttribute]: true } : {})}
      className={cn('not-prose my-5', className, sectionProps?.className)}
      surface
    >
      {cards.map((card) => (
        <CoolActionCard
          key={String(card.title)}
          href={card.href}
          onClick={
            card.href && (onCardClick || issueTabId)
              ? (event) => {
                  if (onCardClick) {
                    onCardClick(event, card);
                    return;
                  }

                  if (issueTabId) {
                    openFirstDeployIssueTab(event, issueTabId, card.title);
                  }
                }
              : undefined
          }
          title={card.title}
          description={card.description}
          bullets={card.bullets}
          icon={card.icon}
        />
      ))}
    </CoolActionCardGrid>
  );
}

export function FirstDeployNextSteps({
  className,
  dataAttribute,
  sectionProps,
  steps,
  ...props
}: React.ComponentProps<'section'> & {
  dataAttribute?: string;
  sectionProps?: React.ComponentProps<'section'>;
  steps: FirstDeployStep[];
}) {
  return (
    <section
      {...props}
      {...sectionProps}
      data-cool-docs
      {...(dataAttribute ? { [dataAttribute]: true } : {})}
      className={cn(
        'not-prose my-6 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70',
        className,
        sectionProps?.className,
      )}
    >
      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <a
              key={String(step.title)}
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

export function openFirstDeployIssueTab(
  event: React.MouseEvent<HTMLAnchorElement>,
  id: string,
  value: string,
) {
  event.preventDefault();

  window.dispatchEvent(
    new CustomEvent('mdx-tabs:set-active', {
      detail: {
        id,
        value,
      },
    }),
  );

  document.getElementById(id)?.scrollIntoView({ block: 'start' });
  window.history.pushState(null, '', `#${id}`);
}
