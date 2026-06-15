import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { Root } from 'fumadocs-core/page-tree';
import { createDocsLayoutTabs } from './docs-layout-tabs';

const pageTree = {
  name: 'Docs',
  children: [
    {
      type: 'folder',
      name: 'Get Started',
      root: true,
      children: [
        {
          type: 'page',
          name: 'Introduction',
          url: '/get-started/introduction',
        },
      ],
    },
    {
      type: 'folder',
      name: 'Applications',
      root: true,
      children: [
        {
          type: 'page',
          name: 'Laravel',
          url: '/applications/laravel',
        },
      ],
    },
    {
      type: 'folder',
      name: 'Services',
      root: true,
      index: {
        type: 'page',
        name: 'Services',
        url: '/services/all',
      },
      children: [
        {
          type: 'page',
          name: 'All Services',
          url: '/services/all',
        },
        {
          type: 'page',
          name: 'Activepieces',
          url: '/services/activepieces',
        },
      ],
    },
    {
      type: 'folder',
      name: 'Databases',
      root: true,
      children: [
        {
          type: 'page',
          name: 'PostgreSQL',
          url: '/databases/postgresql',
        },
      ],
    },
    {
      type: 'folder',
      name: 'Integrations',
      root: true,
      children: [
        {
          type: 'page',
          name: 'MCP',
          url: '/integrations/mcp',
        },
      ],
    },
    {
      type: 'folder',
      name: 'API Reference',
      root: true,
      children: [
        {
          type: 'page',
          name: 'Authorization',
          url: '/api-reference/authorization',
        },
      ],
    },
    {
      type: 'folder',
      name: 'Troubleshoot',
      root: true,
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
    {
      type: 'folder',
      name: 'Knowledge Base',
      root: true,
      children: [
        {
          type: 'page',
          name: 'Commands',
          url: '/knowledge-base/commands',
        },
      ],
    },
  ],
} satisfies Root;

describe('createDocsLayoutTabs', () => {
  test('builds the balanced 8-item switcher without descriptions', () => {
    const tabs = createDocsLayoutTabs(pageTree);
    const titles = tabs.map((tab) => tab.title);
    const services = tabs.find((tab) => tab.title === 'Services');
    const troubleshoot = tabs.find((tab) => tab.title === 'Troubleshoot');

    assert.deepEqual(titles, [
      'Core',
      'Apps',
      'Services',
      'Databases',
      'Integrations',
      'API',
      'Troubleshoot',
      'Knowledge Base',
    ]);

    assert.equal(services?.url, '/services/all');
    assert.equal(services?.urls?.has('/services/all'), true);
    assert.equal(services?.urls?.has('/services/activepieces'), true);
    assert.equal(services?.description, undefined);
    assert.ok(services?.icon);

    assert.equal(troubleshoot?.url, '/troubleshoot');
    assert.equal(troubleshoot?.urls?.has('/troubleshoot'), true);
    assert.equal(troubleshoot?.urls?.has('/troubleshoot/applications/bad-gateway'), true);
    assert.equal(troubleshoot?.description, undefined);
    assert.ok(troubleshoot?.icon);
    assert.ok(tabs.every((tab) => tab.description === undefined));
    assert.deepEqual(
      tabs.map((tab) => {
        const icon = tab.icon as { props?: { className?: string } };
        return icon.props?.className;
      }),
      [
        'size-5 text-fd-muted-foreground',
        'size-5 text-fd-muted-foreground',
        'size-5 text-fd-muted-foreground',
        'size-5 text-fd-muted-foreground',
        'size-5 text-fd-muted-foreground',
        'size-5 text-fd-muted-foreground',
        'size-5 text-fd-muted-foreground',
        'size-5 text-fd-muted-foreground',
      ],
    );
  });
});
