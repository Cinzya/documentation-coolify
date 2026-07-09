import type React from 'react';
import { Check } from 'reicon-react';
import { CoolCallout } from './cool-callout';
import type { CoolIcon } from './cool-types';

type CoolFlowProps = {
  checklist: React.ReactNode[];
  endnote?: React.ReactNode;
  icon: CoolIcon;
  id: string;
  result?: React.ReactNode;
  steps: React.ReactNode[];
  summary: React.ReactNode;
  title: string;
};

export function CoolFlow({ checklist, endnote, icon, id, result, steps, summary, title }: CoolFlowProps) {
  const finalNote = endnote ?? result;

  return (
    <CoolCallout data-cool-docs className="overflow-hidden" contentClassName="!p-0" id={id} icon={icon} title={title}>
      <div className="p-4 sm:p-5">
        <p className="m-0 text-sm leading-6 text-fd-muted-foreground">{summary}</p>
      </div>
      <div className="grid gap-0 border-t border-fd-border lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-fd-border p-4 lg:border-b-0 lg:border-e sm:p-5">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-3 pb-5 last:pb-0">
                {index < steps.length - 1 ? (
                  <span className="absolute left-[0.8125rem] top-7 h-[calc(100%-1.75rem)] w-px bg-fd-border" aria-hidden={true} />
                ) : null}
                <span className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-fd-border bg-fd-background text-xs font-semibold text-fd-foreground">
                  {index + 1}
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="m-0 text-sm font-semibold leading-6 text-fd-foreground">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <ul className="m-0 space-y-2 p-0">
            {checklist.map((item, index) => (
              <li key={index} className="flex gap-2 text-sm leading-6 text-fd-muted-foreground">
                <Check className="mt-1 size-4 shrink-0 text-fd-foreground" aria-hidden={true} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {finalNote ? <p className="m-0 mt-5 text-sm leading-6 text-fd-muted-foreground">{finalNote}</p> : null}
        </div>
      </div>
    </CoolCallout>
  );
}
