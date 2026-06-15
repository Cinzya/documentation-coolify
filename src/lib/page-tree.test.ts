import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, test } from 'node:test';
import type { Root } from 'fumadocs-core/page-tree';
import { searchPath } from 'fumadocs-core/breadcrumb';
import { prepareHomeSidebarPageTree, preparePageTree } from './page-tree';

describe('preparePageTree', () => {
  test('keeps home sidebar metadata aligned with root content files', () => {
    const docsDir = path.join(process.cwd(), 'content/docs');
    const meta = JSON.parse(fs.readFileSync(path.join(docsDir, 'meta.json'), 'utf8')) as { pages: string[] };
    const contentSlugs = new Set(
      fs
        .readdirSync(docsDir, { withFileTypes: true })
        .flatMap((entry) => {
          if (entry.isDirectory()) return [entry.name];
          if (entry.isFile() && entry.name.endsWith('.mdx')) return [entry.name.replace(/\.mdx$/, '')];
          return [];
        }),
    );
    const pageSlugs = meta.pages.filter((page) => !page.startsWith('---'));

    assert.ok(pageSlugs.includes('choose-your-path'));
    assert.ok(pageSlugs.includes('deploy-your-first-app'));
    assert.ok(pageSlugs.includes('deploy-your-first-database'));
    assert.ok(pageSlugs.includes('deploy-your-first-service'));
    assert.deepEqual(
      pageSlugs
        .filter((page) => ['choose-your-path', 'start-with-self-hosted', 'start-with-cloud', 'support'].includes(page))
        .filter((page) => !contentSlugs.has(page)),
      [],
    );
  });

  test('keeps core sidebar metadata aligned with core content files', () => {
    const docsDir = path.join(process.cwd(), 'content/docs/core');
    const meta = JSON.parse(fs.readFileSync(path.join(docsDir, 'meta.json'), 'utf8')) as { pages: string[] };
    const contentSlugs = new Set(
      fs
        .readdirSync(docsDir, { withFileTypes: true })
        .flatMap((entry) => {
          if (entry.isDirectory()) return [entry.name];
          if (entry.isFile() && entry.name.endsWith('.mdx')) return [entry.name.replace(/\.mdx$/, '')];
          return [];
        }),
    );
    const pageSlugs = meta.pages.filter((page) => !page.startsWith('---'));

    assert.ok(pageSlugs.includes('what-is-coolify'));
    assert.ok(pageSlugs.includes('instance-management'));
    assert.ok(pageSlugs.includes('backup-and-recovery'));
    assert.deepEqual(pageSlugs.filter((page) => !contentSlugs.has(page)), []);
  });

  test('keeps troubleshoot overview inside the troubleshoot root for sidebar scoping', () => {
    const tree = preparePageTree({
      name: 'Docs',
      children: [
        {
          type: 'folder',
          name: 'Troubleshoot',
          root: true,
          $ref: 'troubleshoot/meta.json',
          children: [
            {
              type: 'folder',
              name: 'Applications',
              children: [
                {
                  type: 'page',
                  name: 'Bad Gateway',
                  url: '/troubleshoot/applications/bad-gateway',
                },
              ],
            },
          ],
        },
      ],
    } satisfies Root);

    const path = searchPath(tree.children, '/troubleshoot');
    const root = path
      ?.slice()
      .reverse()
      .find((item) => item.type === 'folder' && item.root);

    assert.equal(root?.name, 'Troubleshoot');
  });

  test('removes root section folders from the home sidebar tree', () => {
    const tree = prepareHomeSidebarPageTree({
      name: 'Docs',
      children: [
        {
          type: 'page',
          name: 'Choose your path',
          url: '/choose-your-path',
        },
        {
          type: 'folder',
          name: 'Core',
          root: true,
          $ref: 'core/meta.json',
          children: [],
        },
        {
          type: 'folder',
          name: 'Contribute',
          children: [],
        },
      ],
    } satisfies Root);

    assert.deepEqual(
      tree.children.map((node) => node.name),
      ['Choose your path', 'Contribute'],
    );
  });
});
