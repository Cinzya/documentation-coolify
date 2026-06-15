import type { Folder, Item, Node, Root } from 'fumadocs-core/page-tree';

type FolderIndexLink = {
  item: Item;
  includeInChildren?: boolean;
};

const folderIndexLinks = new Map<string, FolderIndexLink>([
  [
    'services/meta.json',
    {
      item: {
        $id: 'services-introduction-index',
        type: 'page',
        name: 'Services',
        url: '/services/all',
      },
    },
  ],
  [
    'troubleshoot/meta.json',
    {
      item: {
        $id: 'troubleshoot-overview-index',
        type: 'page',
        name: 'Overview',
        url: '/troubleshoot',
      },
      includeInChildren: true,
    },
  ],
]);

function applyFolderIndexLinks(nodes: Node[]) {
  for (const node of nodes) {
    if (node.type !== 'folder') continue;

    const linkedIndex = node.$ref ? folderIndexLinks.get(node.$ref) : undefined;

    if (linkedIndex) {
      node.index = { ...linkedIndex.item };

      if (linkedIndex.includeInChildren && !node.children.some((child) => child.type === 'page' && child.url === node.index?.url)) {
        node.children.unshift({ ...linkedIndex.item });
      }
    }

    const index = node.children.find(
      (child): child is Item => child.type === 'page' && linkedIndex?.item.url === child.url,
    );

    if (index) {
      node.index = { ...index };
    }

    applyFolderIndexLinks(node.children);
  }
}

export function preparePageTree<T extends Root | Folder>(tree: T): T {
  const prepared = {
    ...tree,
    children: tree.children.filter((node) => !(node.type === 'page' && node.url === '/')),
  };

  applyFolderIndexLinks(prepared.children);
  return prepared;
}

export function prepareHomeSidebarPageTree(tree: Root): Root {
  return {
    ...tree,
    children: tree.children.filter((node) => !(node.type === 'folder' && node.root === true)),
  };
}
