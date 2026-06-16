import assert from 'node:assert/strict';
import fs from 'node:fs';
import { describe, test } from 'node:test';

describe('ViewOptionsPopover', () => {
  test('uses the filled reicon external-link indicator', () => {
    const source = fs.readFileSync('src/components/page-actions.tsx', 'utf8');

    assert.match(source, /SquareArrowRightUp/);
    assert.doesNotMatch(source, /ExternalLinkIcon/);
    assert.match(source, /weight="Filled"/);
  });
});
