import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseEditorialPackage } from '../scripts/openbot-result-contract.mjs';

test('rejeita pacote editorial incompleto', () => {
  const result = parseEditorialPackage('# Texto solto');
  assert.equal(result.ok, false);
  assert.ok(result.errors.length >= 5);
});

test('valida o pacote real do Getsêmani sem permitir publicação', async () => {
  const file = 'C:/Users/gilso/OpenBot/Shared/MDO-GETSEMANI-60bd2c4a/README.md';
  const result = parseEditorialPackage(await readFile(file, 'utf8'));
  assert.equal(result.ok, true, result.errors.join(' '));
  assert.equal(result.article.status, 'draft');
  assert.match(result.article.content, /<h2>/);
  assert.doesNotMatch(result.article.content, /<script/i);
  assert.ok(result.article.faq.length >= 2);
  assert.ok(result.article.verified_references.every((item) => item.verified && item.source_url.startsWith('https://')));
});
