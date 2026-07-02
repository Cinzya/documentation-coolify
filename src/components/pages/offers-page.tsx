'use client';

import {
  ArrowRight,
  Copy,
  CopySuccess2,
  ReceiptDiscount2,
  SecuritySafe2,
} from 'reicon-react';
import type React from 'react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { CoolCallout } from '@/components/docs/cool-callout';
import { CoolFlow } from '@/components/docs/cool-flow';
import { cn } from '@/lib/ui/cn';

const promoCode = 'C00L1FYLM40';

const stepLinkClass =
  'font-semibold text-fd-foreground underline decoration-fd-muted-foreground/50 underline-offset-4 transition hover:decoration-fd-primary hover:text-fd-primary';

const offerNotes = [
  {
    label: 'Coolify code',
    value: '€20',
    detail: 'Available for 3 months for new Hetzner users.',
  },
  {
    label: 'Hetzner sign-up code',
    value: '€50',
    detail: 'Available for 1 month for new Hetzner users.',
  },
];

export function OffersPage({ children }: { children?: React.ReactNode }) {
  const [promoCopied, copyPromoCode] = useCopyButton(() => navigator.clipboard.writeText(promoCode));
  const CopyIcon = promoCopied ? CopySuccess2 : Copy;

  return (
    <div data-offers-page data-cool-docs className="not-prose space-y-6">
      <style>
        {`
          body:has([data-offers-page]) #nd-toc {
            display: none;
          }
        `}
      </style>

      <CoolCallout id="hetzner" icon={ReceiptDiscount2} title="Promo code" contentClassName="!p-0">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-fd-border p-4 lg:border-b-0 lg:border-e sm:p-5">
            <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
              Use the Coolify promo code below to get <strong className="font-semibold text-fd-foreground">€20</strong> in Hetzner account credit for 3 months.
            </p>
            <div className="mt-4 rounded-lg border border-fd-border bg-fd-background p-4">
              <p className="m-0 text-xs font-medium leading-5 text-fd-muted-foreground">Promo code</p>
              <div className="relative mt-2">
                <button
                  type="button"
                  onClick={copyPromoCode}
                  aria-label="Copy promo code"
                  title={promoCopied ? 'Copied' : 'Copy promo code'}
                  className={cn(
                    buttonVariants({
                      color: 'secondary',
                      size: 'sm',
                      className: 'absolute right-2 top-2 z-10 h-7 gap-1.5 px-2 text-xs [&_svg]:size-3.5',
                    }),
                  )}
                >
                  <CopyIcon weight="Filled" aria-hidden={true} />
                  {promoCopied ? 'Copied' : 'Copy'}
                </button>
                <pre className="overflow-x-auto rounded-md border border-fd-border bg-fd-muted/40 px-3 py-2 pe-20 text-sm font-semibold leading-6">
                  <code className="select-all font-mono text-fd-foreground">
                    <span className="text-fd-primary">{promoCode}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <h3 className="m-0 text-sm font-semibold text-fd-foreground">Credit comparison</h3>
            <div className="mt-4 grid gap-3">
              {offerNotes.map((note) => (
                <div key={note.label} className="rounded-lg border border-fd-border bg-fd-muted/20 p-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-fd-foreground">{note.label}</span>
                    <span className="text-sm font-medium text-fd-foreground">{note.value}</span>
                  </div>
                  <p className="m-0 mt-1 text-xs leading-5 text-fd-muted-foreground">{note.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CoolCallout>

      {children}

      <CoolFlow
        id="activate-promo-code"
        icon={SecuritySafe2}
        title="Activate the promo code"
        summary="Redeem the code from a new Hetzner account before creating any resources."
        steps={[
          <>
            Create a{' '}
            <a className={stepLinkClass} href="https://accounts.hetzner.com/signUp">
              Hetzner account
            </a>
          </>,
          <>
            Open{' '}
            <a className={stepLinkClass} href="https://accounts.hetzner.com/user">
              User Account
            </a>{' '}
            →{' '}
            <a className={stepLinkClass} href="https://accounts.hetzner.com/user/promoCodes">
              Promo Codes
            </a>
          </>,
          'Enter the Coolify promo code',
        ]}
        checklist={[
          'The credit applies to future invoices automatically.',
          'The Coolify promo code gives you 3 months to use the credit.',
        ]}
        result={
          <a
            href="https://console.hetzner.cloud/"
            className="method-button method-button-primary inline-flex w-fit items-center gap-2 border px-3 py-2 text-sm font-semibold transition"
          >
            Open Hetzner Console
            <ArrowRight className="size-4" aria-hidden={true} />
          </a>
        }
      />
    </div>
  );
}
