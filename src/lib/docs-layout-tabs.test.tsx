import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { Root } from 'fumadocs-core/page-tree';
import { createDocsLayoutTabs } from './docs-layout-tabs';

const pageTree = {
  name: 'Docs',
  children: [
    {
      type: 'page',
      name: 'Home',
      url: '/',
    },
    {
      type: 'page',
      name: 'Choose your path',
      url: '/choose-your-path',
    },
    {
      type: 'page',
      name: 'Support',
      url: '/support',
    },
    {
      type: 'folder',
      name: 'Core',
      root: true,
      $ref: 'core/meta.json',
      children: [
        {
          type: 'page',
          name: 'What is Coolify',
          url: '/core/what-is-coolify',
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
  test('builds the balanced 9-item switcher without descriptions', () => {
    const tabs = createDocsLayoutTabs(pageTree);
    const titles = tabs.map((tab) => tab.title);
    const home = tabs.find((tab) => tab.title === 'Home');
    const core = tabs.find((tab) => tab.title === 'Core');
    const services = tabs.find((tab) => tab.title === 'Services');
    const troubleshoot = tabs.find((tab) => tab.title === 'Troubleshoot');

    assert.deepEqual(titles, [
      'Home',
      'Core',
      'Apps',
      'Services',
      'Databases',
      'Integrations',
      'API',
      'Troubleshoot',
      'Knowledge Base',
    ]);

    assert.equal(home?.url, '/');
    assert.equal(home?.urls?.has('/'), true);
    assert.equal(home?.urls?.has('/choose-your-path'), true);
    assert.equal(home?.urls?.has('/support'), true);
    assert.equal(core?.url, '/core/what-is-coolify');
    assert.equal(core?.urls?.has('/core/what-is-coolify'), true);
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
        'size-5 text-fd-muted-foreground',
      ],
    );
  });
});
