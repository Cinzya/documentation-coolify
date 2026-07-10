import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import type { MDXComponents } from 'mdx/types';
import type React from 'react';
import { MediaCard } from '@/components/cards/media-card';
import { MediaCardGroup } from '@/components/cards/media-card-group';
import { ServicesList } from '@/components/data/services-list';
import { SponsorsList } from '@/components/data/sponsors-list';
import { ChooseYourPath } from '@/components/pages/choose-your-path';
import { ContributionGuidelinesPage } from '@/components/pages/contribution-guidelines-page';
import { OffersPage } from '@/components/pages/offers-page';
import {
  CloudAccessBasics,
  CloudNextSteps,
  CloudServerOptions,
} from '@/components/pages/start-with-cloud';
import { SponsorsPage } from '@/components/pages/sponsors-page';
import {
  SelfHostedAdvancedOptions,
  SelfHostedFirewallSshBasics,
  SelfHostedInstallMethods,
  SelfHostedInstallationTab,
  SelfHostedInstallationTabs,
  SelfHostedMethodGuide,
  SelfHostedNextSteps,
  SelfHostedProjectResources,
  SelfHostedRaspberryInstallMethods,
  SelfHostedServerRequirements,
} from '@/components/pages/start-with-self-hosted';
import { SupportPage } from '@/components/pages/support-page';
import { TeamPage } from '@/components/pages/team-page';
import { CoolActionCard } from './cool-action-card';
import { CoolActionCardGrid } from './cool-action-card-grid';
import { CoolAccordions } from './cool-accordions';
import { CoolCard, CoolCardGrid } from './cool-card';
import { CoolCallout } from './cool-callout';
import { CoolCompare, CoolCompareColumn } from './cool-compare';
import { CoolFlow } from './cool-flow';
import { CoolNextSteps } from './cool-next-steps';
import {
  CoolDocsPage,
  CoolInlineValue,
  CoolPanel,
  CoolValueCard,
  CoolValueGrid,
} from './cool-layout';
import { CoolTable } from './cool-table';
import { Callout } from './callout';
import { ScreenshotTab, ScreenshotTabs } from './screenshot-tabs';
import { Tab, Tabs } from './tabs';
import { ZoomImage } from './zoom-image';

function Badge({ text, children }: { type?: string; text?: string; children?: React.ReactNode }) {
  return (
    <span className="mx-1 inline-flex items-center rounded-md border border-fd-border bg-fd-muted px-1.5 py-0.5 align-middle text-xs font-medium text-fd-muted-foreground">
      {text ?? children}
    </span>
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Badge,
    Callout,
    Card,
    Cards,
    ChooseYourPath,
    ContributionGuidelinesPage,
    CloudAccessBasics,
    CloudNextSteps,
    CloudServerOptions,
    CoolActionCard,
    CoolActionCardGrid,
    CoolAccordions,
    CoolCard,
    CoolCardGrid,
    CoolCallout,
    CoolCompare,
    CoolCompareColumn,
    CoolDocsPage,
    CoolFlow,
    CoolInlineValue,
    CoolNextSteps,
    CoolPanel,
    CoolTable,
    CoolValueCard,
    CoolValueGrid,
    File,
    Files,
    Folder,
    MediaCard,
    MediaCardGroup,
    OffersPage,
    ScreenshotTab,
    ScreenshotTabs,
    ServicesList,
    SelfHostedAdvancedOptions,
    SelfHostedFirewallSshBasics,
    SelfHostedInstallMethods,
    SelfHostedInstallationTab,
    SelfHostedInstallationTabs,
    SelfHostedMethodGuide,
    SelfHostedNextSteps,
    SelfHostedProjectResources,
    SelfHostedRaspberryInstallMethods,
    SelfHostedServerRequirements,
    SponsorsList,
    SponsorsPage,
    SupportPage,
    TeamPage,
    Step,
    Steps,
    Tab,
    Tabs,
    img: (props) => <ZoomImage {...(props as any)} />,
    Image: ZoomImage,
    ZoomableImage: ZoomImage,
    ZoomImage,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
