'use client';

import type React from 'react';
import { ArrowRight } from 'reicon-react';
import type { CoolIcon } from '@/components/docs/cool-types';
import { cn } from '@/lib/ui/cn';

export type CoolNextStep = {
  detail: React.ReactNode;
  href: string;
  icon: CoolIcon;
  title: React.ReactNode;
};

export function CoolNextSteps({
  className,
  steps,
  ...props
}: React.ComponentProps<'section'> & {
  steps: CoolNextStep[];
}) {
  return (
    <section
      {...props}
      data-cool-docs
      className={cn(
        'not-prose my-6 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70',
        className,
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
