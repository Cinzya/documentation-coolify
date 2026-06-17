import type React from 'react';
import { ArrowRight, Check } from 'reicon-react';
import { cn } from '@/lib/cn';
import type { CoolActionCardVariant, CoolIcon } from './cool-types';

type CoolActionCardProps = Omit<React.ComponentProps<'a'>, 'title'> & {
  bullets?: React.ReactNode[];
  cta?: React.ReactNode;
  description?: React.ReactNode;
  icon: CoolIcon;
  title: React.ReactNode;
  variant?: CoolActionCardVariant;
};

export function CoolActionCard({
  bullets,
  className,
  cta,
  description,
  href,
  icon: Icon,
  onClick,
  title,
  variant = 'primary',
  ...props
}: CoolActionCardProps) {
  const content = (
    <article className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-fd-border bg-fd-muted/40 text-fd-foreground transition-colors group-hover:bg-fd-muted/60">
          <Icon className="size-5" weight="Filled" aria-hidden={true} />
        </span>
        <div className="min-w-0">
          <h3 className="m-0 text-base font-semibold text-fd-foreground">{title}</h3>
        </div>
      </div>

      {description ? (
        <p className="m-0 mt-4 text-sm leading-6 text-fd-muted-foreground">{description}</p>
      ) : null}

      {bullets?.length ? (
        <ul className="m-0 mt-4 space-y-2 p-0">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex gap-2 text-sm leading-6 text-fd-muted-foreground">
              <Check className="mt-1 size-4 shrink-0 text-fd-foreground" aria-hidden={true} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {cta ? (
        <span className={`method-button method-button-${variant} mt-5 inline-flex w-fit items-center gap-2 border px-3 py-2 text-sm font-semibold transition`}>
          {cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden={true} />
        </span>
      ) : null}
    </article>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={cn(
          `method-card method-card-${variant} group rounded-lg border border-fd-border bg-fd-background/70 p-5 shadow-sm transition duration-200 hover:-translate-y-1`,
          className,
        )}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={cn('method-card group rounded-lg border border-fd-border bg-fd-background/70 p-5 shadow-sm', className)}
    >
      {content}
    </div>
  );
}
