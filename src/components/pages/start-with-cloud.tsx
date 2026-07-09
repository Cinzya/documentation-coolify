import { ArrowRight } from 'reicon-react';
import { CoolActionCard } from '@/components/docs/cool-action-card';
import { CoolActionCardGrid } from '@/components/docs/cool-action-card-grid';
import { firewallSshGuides, nextSteps, serverRequirementOptions } from './start-with-self-hosted';

export function CloudServerOptions() {
  return (
    <div data-cloud-start className="not-prose my-4">
      <section className="overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
          {serverRequirementOptions.map((option) => {
            const Icon = option.icon;

            return (
              <div
                key={option.title}
                className="flex gap-3 rounded-lg border border-fd-border bg-fd-background/70 p-4 shadow-sm"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-fd-border bg-fd-muted/40 text-fd-foreground">
                  <Icon className="size-5" weight="Filled" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-fd-foreground">{option.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-fd-muted-foreground">{option.detail}</span>
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export function CloudAccessBasics() {
  return (
    <CoolActionCardGrid data-cloud-start className="not-prose my-5">
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

export function CloudNextSteps() {
  return (
    <section data-cloud-start data-cool-docs className="not-prose my-6 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70">
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
    </section>
  );
}
