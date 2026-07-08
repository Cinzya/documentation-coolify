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
import { CoolifyContributionPage } from '@/components/pages/coolify-contribution-page';
import { ContributionGuidelinesPage } from '@/components/pages/contribution-guidelines-page';
import { DocumentationContributionPage } from '@/components/pages/documentation-contribution-page';
import { OffersPage } from '@/components/pages/offers-page';
import { ServiceContributionPage } from '@/components/pages/service-contribution-page';
import {
  FirstDatabaseDeploymentFlow,
  FirstDatabaseExposureWarning,
  FirstDatabaseNextSteps,
  FirstDatabasePortMapping,
  FirstDatabasePrerequisites,
  FirstDatabaseTroubleshooting,
} from '@/components/pages/deploy-your-first-database';
import {
  FirstServiceDeploymentFlow,
  FirstServiceNetworkChoices,
  FirstServiceNextSteps,
  FirstServicePrerequisites,
  FirstServiceTroubleshooting,
} from '@/components/pages/deploy-your-first-service';
import {
  FirstAppDeploymentFlow,
  FirstAppNetworkChoices,
  FirstAppNextSteps,
  FirstAppPrerequisites,
  FirstAppTroubleshooting,
} from '@/components/pages/deploy-your-first-app';
import {
  CloudAccessBasics,
  CloudNextSteps,
  CloudOnboardingFlow,
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
import { CoolCallout } from './cool-callout';
import { CoolFlow } from './cool-flow';
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
    CoolifyContributionPage,
    ContributionGuidelinesPage,
    CloudAccessBasics,
    CloudNextSteps,
    CloudOnboardingFlow,
    CloudServerOptions,
    CoolActionCard,
    CoolActionCardGrid,
    CoolCallout,
    CoolFlow,
    CoolTable,
    DocumentationContributionPage,
    File,
    Files,
    FirstDatabaseDeploymentFlow,
    FirstDatabaseExposureWarning,
    FirstDatabaseNextSteps,
    FirstDatabasePortMapping,
    FirstDatabasePrerequisites,
    FirstDatabaseTroubleshooting,
    FirstServiceDeploymentFlow,
    FirstServiceNetworkChoices,
    FirstServiceNextSteps,
    FirstServicePrerequisites,
    FirstServiceTroubleshooting,
    FirstAppDeploymentFlow,
    FirstAppNetworkChoices,
    FirstAppNextSteps,
    FirstAppPrerequisites,
    FirstAppTroubleshooting,
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
    ServiceContributionPage,
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
