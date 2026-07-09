import React from 'react';
import { cn } from '@/lib/ui/cn';

type CoolActionCardGridProps = React.ComponentProps<'section'> & {
  surface?: boolean;
};

export function CoolActionCardGrid({ children, className, surface = false, ...props }: CoolActionCardGridProps) {
  const cardCount = React.Children.toArray(children).filter(Boolean).length;

  return (
    <section
      data-cool-docs
      className={cn(
        'grid gap-4 sm:grid-cols-2',
        surface ? 'overflow-hidden rounded-lg border border-fd-border bg-fd-background/70 p-4 sm:p-5' : null,
        cardCount === 1 ? 'max-w-md' : null,
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
