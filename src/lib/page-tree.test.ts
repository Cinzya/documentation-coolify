import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, test } from 'node:test';
import type { Root } from 'fumadocs-core/page-tree';
import { searchPath } from 'fumadocs-core/breadcrumb';
import { preparePageTree } from './page-tree';

describe('preparePageTree', () => {
  test('keeps core sidebar metadata aligned with get started content files', () => {
    const docsDir = path.join(process.cwd(), 'content/docs/get-started');
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

    assert.deepEqual(
      pageSlugs.filter((page) => !contentSlugs.has(page)),
      [],
    );
    assert.ok(pageSlugs.includes('choose-your-path'));
    assert.ok(pageSlugs.includes('deploy-your-first-app'));
    assert.ok(pageSlugs.includes('deploy-your-first-database'));
    assert.ok(pageSlugs.includes('deploy-your-first-service'));
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
});
