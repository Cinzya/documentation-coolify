import assert from 'node:assert/strict';
import fs from 'node:fs';
import { describe, test } from 'node:test';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { mobileSearchTriggerSlots } from '@/components/mobile-header-controls';
import { baseOptions } from './layout.shared';

describe('baseOptions', () => {
  test('uses custom mobile header controls for search and sidebar', () => {
    const options = baseOptions();

    assert.ok(options.slots?.searchTrigger);
    assert.ok(options.slots?.sidebar?.trigger);
    assert.equal(options.slots.searchTrigger, mobileSearchTriggerSlots);
    assert.notEqual(mobileSearchTriggerSlots.full, FullSearchTrigger);
  });

  test('keeps the drawer sidebar toggle out of the desktop sidebar', () => {
    const css = fs.readFileSync('src/styles/app.css', 'utf8');

    assert.match(css, /#nd-sidebar\s+\[data-mobile-sidebar-toggle\]\s*\{\s*display:\s*none;/);
  });

  test('keeps the full search trigger on the default border styling', () => {
    const css = fs.readFileSync('src/styles/app.css', 'utf8');

    assert.doesNotMatch(css, /button\[data-search-full\]/);
  });

  test('adds left breathing room to the desktop sidebar switcher icon', () => {
    const css = fs.readFileSync('src/styles/app.css', 'utf8');

    assert.match(
      css,
      /#nd-sidebar > div:first-child > button:not\(\[data-theme-toggle\]\)\s*\{[^}]*padding-inline:\s*0\.75rem 0\.5rem;/,
    );
  });
});
