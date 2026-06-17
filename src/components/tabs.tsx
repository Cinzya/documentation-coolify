'use client';

import type React from 'react';
import { Children, createContext, isValidElement, useContext, useEffect, useMemo, useState } from 'react';
import {
  Autobrightness2,
  Box2,
  BrowserTerminal,
  Building,
  Checklist2,
  Cloud,
  Code,
  Database,
  Globe,
  Globe3,
  LaptopCode,
  Layers,
  Package,
  PenNib,
  ServerCloud,
  User,
} from 'reicon-react';
import { cn } from '@/lib/cn';

type TabsContextValue = {
  items?: string[];
};

type TabsProps = Omit<React.ComponentProps<'div'>, 'defaultValue'> & {
  defaultIndex?: number;
  defaultValue?: string;
  items?: string[];
  label?: React.ReactNode;
};

type TabProps = Omit<React.ComponentProps<'div'>, 'value'> & {
  value?: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function escapeValue(value: string) {
  return value.toLowerCase().replace(/\s/, '-');
}

function getTabIcon(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes('automated')) return Autobrightness2;
  if (normalized.includes('manual')) return LaptopCode;
  if (normalized.includes('raspberry')) return ServerCloud;
  if (normalized.includes('custom docker network')) return Globe3;
  if (normalized.includes('custom registry source')) return Box2;
  if (normalized.includes('compose overrides')) return PenNib;
  if (normalized.includes('dashboard')) return BrowserTerminal;
  if (normalized.includes('api')) return Code;
  if (normalized.includes('cloud')) return Cloud;
  if (normalized.includes('aws') || normalized.includes('hostinger') || normalized.includes('hetzner')) return Building;
  if (normalized.includes('database') || normalized.includes('postgres') || normalized.includes('redis')) return Database;
  if (normalized.includes('account') || normalized.includes('organization')) return User;
  if (normalized.includes('node') || normalized.includes('traefik') || normalized.includes('caddy')) return Package;
  if (normalized.includes('debian') || normalized.includes('ubuntu') || normalized.includes('centos') || normalized.includes('linux')) return Globe;

  return Layers;
}

export function Tabs({
  children,
  className,
  defaultIndex = 0,
  defaultValue,
  id,
  items,
  label,
  ...props
}: TabsProps) {
  const initialValue = defaultValue ?? (items ? escapeValue(items[defaultIndex] ?? items[0] ?? '') : undefined);
  const [activeValue, setActiveValue] = useState(initialValue);
  const panels = Children.toArray(children).filter(isValidElement) as React.ReactElement<TabProps>[];
  const renderedItems = items ?? panels.map((panel) => panel.props.value).filter(Boolean) as string[];
  const activePanel = panels.find((panel) => escapeValue(panel.props.value ?? '') === activeValue) ?? panels[0];

  useEffect(() => {
    if (!id) return;

    function handleTabChange(event: Event) {
      const detail = (event as CustomEvent<{ id?: string; value?: string }>).detail;
      if (detail.id !== id || !detail.value) return;

      setActiveValue(escapeValue(detail.value));
    }

    window.addEventListener('mdx-tabs:set-active', handleTabChange);

    return () => {
      window.removeEventListener('mdx-tabs:set-active', handleTabChange);
    };
  }, [id]);

  return (
    <div
      id={id}
      data-mdx-tabs
      className={cn(
        'my-4 overflow-hidden rounded-lg border border-fd-border bg-fd-background/70',
        className,
      )}
      {...props}
    >
      <style>
        {`
          [data-mdx-tabs] .mdx-tab-active {
            border-color: #6f50e8;
            color: white;
            background: linear-gradient(135deg, #8b73ff 0%, #6f50e8 48%, #5c38d5 100%);
            box-shadow:
              0 5px 12px rgb(94 62 216 / 0.2);
          }

          .dark [data-mdx-tabs] .mdx-tab-active {
            background: linear-gradient(135deg, #8b73ff 0%, #6f50e8 48%, #5c38d5 100%);
            box-shadow: 0 5px 12px rgb(94 62 216 / 0.22);
          }

          [data-mdx-tabs] [data-tab-value] > :where(h2, h3, h4):first-child {
            height: 0;
            margin: 0 !important;
            overflow: hidden;
            padding: 0 !important;
            pointer-events: none;
          }

          [data-mdx-tabs] [data-tab-value] table {
            border-collapse: separate;
            border-spacing: 0;
            display: table;
            margin-block: 0;
            width: 100%;
          }

          [data-mdx-tabs] [data-tab-value] :where(p):has(+ table),
          [data-mdx-tabs] [data-tab-value] :where(p):has(+ div table) {
            margin-bottom: 0.375rem;
          }

          [data-mdx-tabs] [data-tab-value] :where(p) + :where(div):has(table) {
            margin-top: 0.375rem !important;
          }

          [data-mdx-tabs] [data-tab-value] table th,
          [data-mdx-tabs] [data-tab-value] table td {
            border-inline-start: 1px solid var(--color-fd-border);
            border-bottom: 1px solid var(--color-fd-border);
            padding: 1rem;
            text-align: start;
            vertical-align: top;
          }

          [data-mdx-tabs] [data-tab-value] table th {
            background: rgb(255 255 255 / 0.035);
            color: var(--color-fd-foreground);
            font-weight: 600;
          }

          html:not(.dark) [data-mdx-tabs] [data-tab-value] table th {
            background: rgb(0 0 0 / 0.045);
          }

          [data-mdx-tabs] [data-tab-value] table th:first-child,
          [data-mdx-tabs] [data-tab-value] table td:first-child {
            border-inline-start: 0;
          }

          [data-mdx-tabs] [data-tab-value] table tbody tr:last-child td {
            border-bottom: 0;
          }
        `}
      </style>
      <div className="not-prose flex items-center gap-3 border-b border-fd-border bg-fd-muted/30 px-3 py-2 text-sm font-semibold text-fd-foreground">
        {label ? <span className="shrink-0 text-fd-muted-foreground">{label}</span> : null}
        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {renderedItems.map((item) => {
            const value = escapeValue(item);
            const isActive = value === activeValue;
            const Icon = getTabIcon(item);

            return (
              <button
                key={item}
                type="button"
                className={cn(
                  'inline-flex shrink-0 items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors',
                  isActive
                    ? 'mdx-tab-active'
                    : 'border-transparent text-fd-muted-foreground hover:bg-fd-muted/50 hover:text-fd-foreground',
                )}
                onClick={() => setActiveValue(value)}
              >
                <Icon className="size-4" weight="Filled" aria-hidden="true" />
                {item}
              </button>
            );
          })}
        </div>
      </div>
      <div className="prose max-w-none p-4 text-[0.9375rem]">
        <TabsContext.Provider value={useMemo(() => ({ items }), [items])}>
          {activePanel}
        </TabsContext.Provider>
      </div>
    </div>
  );
}

export function Tab({ children, className, value, ...props }: TabProps) {
  useContext(TabsContext);

  return (
    <div className={cn('prose-no-margin', className)} data-tab-value={value} {...props}>
      {children}
    </div>
  );
}
