'use client';

import type React from 'react';
import { useState } from 'react';
import { Link3 } from 'reicon-react';
import { cn } from '@/lib/cn';
import type { CoolIcon } from './cool-types';

type CoolCalloutProps = Omit<React.ComponentProps<'section'>, 'title'> & {
  children: React.ReactNode;
  contentClassName?: string;
  icon: CoolIcon;
  id: string;
  title: React.ReactNode;
};

export function CoolCallout({ children, className, contentClassName, icon: Icon, id, title, ...props }: CoolCalloutProps) {
  const [copied, setCopied] = useState(false);

  async function copySectionLink() {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section
      data-cool-docs
      className={cn('rounded-lg border border-fd-border bg-fd-background/70', className)}
      {...props}
    >
      <div id={id} className="section-header flex scroll-mt-24 items-center justify-between gap-3 border-b border-fd-border px-4 py-3 text-sm font-semibold text-fd-foreground">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="size-4 shrink-0" weight="Filled" aria-hidden={true} />
          <span className="truncate">{title}</span>
        </div>
        <button
          type="button"
          aria-label={`Copy link to ${title}`}
          title={copied ? 'Copied' : 'Copy link'}
          onClick={copySectionLink}
          className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-fd-muted-foreground transition hover:bg-fd-muted/50 hover:text-fd-foreground"
        >
          <Link3 className="size-4" weight="Filled" aria-hidden={true} />
        </button>
      </div>
      <div
        className={cn(
          'prose-no-margin px-4 py-4 text-sm leading-6 text-fd-muted-foreground sm:px-5 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>figure]:my-5 [&>p]:my-0 [&>p+p]:mt-3',
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
