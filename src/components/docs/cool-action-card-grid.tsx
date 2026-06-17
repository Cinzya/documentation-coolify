import type React from 'react';
import { cn } from '@/lib/cn';

export function CoolActionCardGrid({ children, className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-cool-docs
      className={cn('overflow-hidden rounded-lg border border-fd-border bg-fd-background/70', className)}
      {...props}
    >
      {children}
    </section>
  );
}
