import type React from 'react';
import { Check } from 'reicon-react';
import { cn } from '@/lib/ui/cn';
import { CoolCallout } from './cool-callout';
import type { CoolIcon } from './cool-types';

type CoolCompareProps = Omit<React.ComponentProps<'section'>, 'title'> & {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  contentClassName?: string;
  description?: React.ReactNode;
  icon: CoolIcon;
  id: string;
  title: React.ReactNode;
};

type CoolCompareColumnProps = Omit<React.ComponentProps<'div'>, 'title'> & {
  items: React.ReactNode[];
  title: React.ReactNode;
};

const gridColumns: Record<NonNullable<CoolCompareProps['columns']>, string> = {
  1: '',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
};

export function CoolCompare({
  children,
  className,
  columns = 2,
  contentClassName,
  description,
  icon,
  id,
  title,
  ...props
}: CoolCompareProps) {
  return (
    <CoolCallout
      data-cool-docs
      className={cn('overflow-hidden', className)}
      contentClassName={cn('!p-0', contentClassName)}
      icon={icon}
      id={id}
      title={title}
      {...props}
    >
      {description ? (
        <div className="p-4 sm:p-5">
          <p className="m-0 text-sm leading-6 text-fd-muted-foreground">{description}</p>
        </div>
      ) : null}

      <div
        className={cn(
          'grid gap-0 divide-y divide-fd-border',
          description ? 'border-t border-fd-border' : undefined,
          columns > 1 ? 'lg:divide-x lg:divide-y-0' : undefined,
          gridColumns[columns],
        )}
      >
        {children}
      </div>
    </CoolCallout>
  );
}

export function CoolCompareColumn({ className, items, title, ...props }: CoolCompareColumnProps) {
  return (
    <div className={cn('p-4 sm:p-5', className)} {...props}>
      <h3 className="m-0 text-sm font-semibold text-fd-foreground">{title}</h3>
      <ul className="m-0 mt-3 space-y-2 p-0">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2 text-sm leading-6 text-fd-muted-foreground">
            <Check className="mt-1 size-4 shrink-0 text-fd-foreground" aria-hidden={true} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
