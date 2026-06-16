import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, test } from 'node:test';
import { ReiconMarkdownCopyButton } from './markdown-copy-button';

describe('ReiconMarkdownCopyButton', () => {
  test('renders a reicon copy icon', () => {
    const markup = renderToStaticMarkup(<ReiconMarkdownCopyButton markdownUrl="/docs/page.md" />);

    assert.match(markup, /class="reicon/);
    assert.match(markup, /Copy Markdown/);
  });
});
