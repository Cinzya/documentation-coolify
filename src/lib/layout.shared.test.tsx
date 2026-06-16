import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { baseOptions } from './layout.shared';

describe('baseOptions', () => {
  test('uses custom mobile header controls for search and sidebar', () => {
    const options = baseOptions();

    assert.ok(options.slots?.searchTrigger);
    assert.ok(options.slots?.sidebar?.trigger);
  });
});
