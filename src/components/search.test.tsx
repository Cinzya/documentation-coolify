import assert from 'node:assert/strict';
import fs from 'node:fs';
import { describe, test } from 'node:test';

describe('LocalSearchDialog', () => {
  test('uses the reicon search icon in the dialog header', () => {
    const source = fs.readFileSync('src/components/search.tsx', 'utf8');

    assert.match(source, /Search3/);
    assert.doesNotMatch(source, /SearchDialogIcon,/);
    assert.doesNotMatch(source, /<SearchDialogIcon \/>/);
  });
});
