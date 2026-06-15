import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Cloud } from 'reicon-react';
import { DiscordInfo, getDiscordInviteUrl } from '@/components/discord-info';
import { GithubInfo, getGithubRepoUrl } from '@/components/github-info';
import { publicAssetFallbackPath, site } from './site';

function CoolifyNavTitle() {
  return (
    <>
      <img
        src={publicAssetFallbackPath('/brand/logo.webp')}
        alt="Coolify logo"
        className="size-6 rounded-md border border-fd-border/60 object-cover shadow-sm"
      />
      <span className="font-semibold tracking-tight">{site.name}</span>
    </>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    links: [
      {
        type: 'icon',
        url: getGithubRepoUrl(),
        text: 'GitHub',
        label: 'GitHub',
        icon: <GithubInfo />,
        external: true,
      },
      {
        type: 'icon',
        url: getDiscordInviteUrl(),
        text: 'Discord',
        label: 'Discord',
        icon: <DiscordInfo />,
        external: true,
      },
      {
        type: 'icon',
        url: 'https://coolify.io/pricing/',
        text: 'Coolify Cloud',
        label: 'Coolify Cloud',
        icon: (
          <>
            <Cloud className="size-4" size={16} weight="Filled" aria-hidden="true" />
            <span>Cloud</span>
          </>
        ),
        external: true,
      },
    ],
    nav: {
      title: <CoolifyNavTitle />,
    },
    themeSwitch: {
      enabled: false,
    },
  };
}
