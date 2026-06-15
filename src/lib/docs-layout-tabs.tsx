import type { Node, Root } from 'fumadocs-core/page-tree';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';
import { AppWindow, BookOpen, Boxes, CircleHelp, Code2, Database, House, Plug, Rocket } from 'lucide-react';
import type { ReactNode } from 'react';

const tabIconClassName = 'size-5 text-fd-muted-foreground';

type HomeTabDefinition = {
  type: 'home';
  title: string;
  icon: ReactNode;
};

type RootTabDefinition = {
  type?: 'root';
  ref: string;
  title: string;
  label?: string;
  fallbackUrl?: string;
  icon: ReactNode;
};

type TabDefinition = HomeTabDefinition | RootTabDefinition;

const tabDefinitions: TabDefinition[] = [
  {
    type: 'home',
    title: 'Home',
    icon: <House className={tabIconClassName} aria-hidden="true" />,
  },
  {
    ref: 'core/meta.json',
    title: 'Core',
    icon: <Rocket className={tabIconClassName} aria-hidden="true" />,
  },
  {
    ref: 'applications/meta.json',
    title: 'Applications',
    label: 'Apps',
    icon: <AppWindow className={tabIconClassName} aria-hidden="true" />,
  },
  {
    ref: 'services/meta.json',
    title: 'Services',
    fallbackUrl: '/services/all',
    icon: <Boxes className={tabIconClassName} aria-hidden="true" />,
  },
  {
    ref: 'databases/meta.json',
    title: 'Databases',
    icon: <Database className={tabIconClassName} aria-hidden="true" />,
  },
  {
    ref: 'integrations/meta.json',
    title: 'Integrations',
    icon: <Plug className={tabIconClassName} aria-hidden="true" />,
  },
  {
    ref: 'api-reference/meta.json',
    title: 'API Reference',
    label: 'API',
    icon: <Code2 className={tabIconClassName} aria-hidden="true" />,
  },
  {
    ref: 'troubleshoot/meta.json',
    title: 'Troubleshoot',
    fallbackUrl: '/troubleshoot',
    icon: <CircleHelp className={tabIconClassName} aria-hidden="true" />,
  },
  {
    ref: 'knowledge-base/meta.json',
    title: 'Knowledge Base',
    icon: <BookOpen className={tabIconClassName} aria-hidden="true" />,
  },
] as const;

type RootFolder = Extract<Node, { type: 'folder' }> & { root: true };

function collectRootPageUrls(nodes: Node[]) {
  const urls = new Set<string>(['/']);

  for (const node of nodes) {
    if (node.type === 'page') {
      urls.add(node.url);
    }
  }

  return urls;
}

function collectPageUrls(nodes: Node[], urls = new Set<string>()) {
  for (const node of nodes) {
    if (node.type === 'page') {
      urls.add(node.url);
      continue;
    }

    if (node.type === 'folder') {
      if (node.index) urls.add(node.index.url);
      collectPageUrls(node.children, urls);
    }
  }

  return urls;
}

function findRootFolder(tree: Root, ref: string, title: string) {
  return tree.children.find(
    (node): node is RootFolder =>
      node.type === 'folder' && node.root === true && (node.$ref === ref || node.name === title),
  );
}

function getTabUrl(folder: RootFolder, fallbackUrl?: string) {
  if (fallbackUrl) return fallbackUrl;
  return folder.index?.url ?? folder.children.find((node) => node.type === 'page')?.url;
}

export function createDocsLayoutTabs(tree: Root): LayoutTab[] {
  return tabDefinitions.flatMap((definition) => {
    if (definition.type === 'home') {
      return [
        {
          title: definition.title,
          icon: definition.icon,
          url: '/',
          urls: collectRootPageUrls(tree.children),
        },
      ];
    }

    const folder = findRootFolder(tree, definition.ref, definition.title);
    if (!folder) return [];

    const urls = collectPageUrls(folder.children);
    if (folder.index) urls.add(folder.index.url);

    const url = getTabUrl(folder, definition.fallbackUrl);
    if (!url) return [];

    urls.add(url);

    return [
      {
        title: definition.label ?? folder.name,
        icon: definition.icon,
        url,
        urls,
      },
    ];
  });
}
