import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import type { MDXComponents } from 'mdx/types';
import type React from 'react';
import { ChooseYourPath } from './choose-your-path';
import { CoolActionCard } from './cool-action-card';
import { CoolActionCardGrid } from './cool-action-card-grid';
import { CoolCallout } from './cool-callout';
import { CoolFlow } from './cool-flow';
import { CoolTable } from './cool-table';
import { Callout } from './callout';
import { MediaCard } from './media-card';
import { MediaCardGroup } from './media-card-group';
import { ScreenshotTab, ScreenshotTabs } from './screenshot-tabs';
import { ServicesList } from './services-list';
import { SponsorsList } from './sponsors-list';
import { SponsorsPage } from './sponsors-page';
import { Tab, Tabs } from './tabs';
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
} from './start-with-self-hosted';
import { TeamPage } from './team-page';
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
    CoolActionCard,
    CoolActionCardGrid,
    CoolCallout,
    CoolFlow,
    CoolTable,
    File,
    Files,
    Folder,
    MediaCard,
    MediaCardGroup,
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
