'use client';

import type { ComponentProps, MouseEvent } from 'react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import type { SearchTriggerProps } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import {
  Sidebar as NotebookSidebar,
  SidebarCollapseTrigger,
  SidebarProvider,
  SidebarTrigger as NotebookSidebarTrigger,
  useSidebar,
} from 'fumadocs-ui/layouts/notebook/slots/sidebar';
import { Search3, Sidebar } from 'reicon-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/cn';

const mobileHeaderButtonClassName =
  'inline-flex size-9 items-center justify-center rounded-lg border bg-fd-secondary/50 text-fd-secondary-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground';

export function MobileSearchTrigger({
  hideIfDisabled,
  onClick,
  color: _color,
  size: _size,
  ...props
}: SearchTriggerProps) {
  const { setOpenSearch, enabled } = useSearchContext();

  if (hideIfDisabled && !enabled) return null;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (!event.defaultPrevented) {
      setOpenSearch(true);
    }
  }

  return (
    <button
      type="button"
      data-search=""
      aria-label="Open Search"
      {...props}
      className={cn(mobileHeaderButtonClassName, 'me-2')}
      onClick={handleClick}
    >
      <Search3 className="size-4.5" weight="Filled" aria-hidden="true" />
    </button>
  );
}

export function MobileSidebarTrigger({ className: _className, children: _children, ...props }: ComponentProps<'button'>) {
  return (
    <NotebookSidebarTrigger {...props} data-mobile-sidebar-toggle="" className={mobileHeaderButtonClassName}>
      <Sidebar className="size-4.5" weight="Filled" aria-hidden="true" />
    </NotebookSidebarTrigger>
  );
}

export function MobileDrawerHeaderActions() {
  return (
    <>
      <ThemeToggle />
      <MobileSidebarTrigger />
    </>
  );
}

export const mobileSidebarSlots = {
  provider: SidebarProvider,
  root: NotebookSidebar,
  trigger: MobileSidebarTrigger,
  collapseTrigger: SidebarCollapseTrigger,
  useSidebar,
};

export const mobileSearchTriggerSlots = {
  sm: MobileSearchTrigger,
  full: FullSearchTrigger,
};
