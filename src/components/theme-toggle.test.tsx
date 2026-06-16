import assert from 'node:assert/strict';
import fs from 'node:fs';
import { describe, test } from 'node:test';

describe('ThemeToggle', () => {
  test('uses filled reicon sun and moon icons', () => {
    const source = fs.readFileSync('src/components/theme-toggle.tsx', 'utf8');

    assert.match(source, /import \{ Moon3, Sun \} from 'reicon-react';/);
    assert.doesNotMatch(source, /from 'lucide-react'/);
    assert.match(source, /const Icon = isDark \? Sun : Moon3;/);
    assert.match(source, /<Icon className="size-4" weight="Filled" aria-hidden="true" \/>/);
  });
});
