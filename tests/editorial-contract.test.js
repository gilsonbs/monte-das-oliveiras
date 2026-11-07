import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPostPayload, validateOpenBotArticle, validateRequest } from '../supabase/functions/_shared/editorial-contract.js';

test('aceita tema e palavra-chave', () => {
  assert.equal(validateRequest({ source_type: 'topic', topic: 'A oração de Daniel', seo_keyword: 'oração de Daniel' }).ok, true);
});

test('rejeita host que imita YouTube', () => {
  assert.equal(validateRequest({ source_type: 'youtube', youtube_url: 'https://youtube.com.evil.test/a', seo_keyword: 'profecias' }).ok, false);
});

test('exige referências bíblicas verificadas', () => {
  const article = { title: 'T', slug: 't', content: '<p>x</p>', excerpt: 'x', seo_title: 'x', meta_description: 'x', faq: [{}, {}], verified_references: [] };
  assert.equal(validateOpenBotArticle(article).ok, false);
});

test('força rascunho no payload mesmo se a resposta pedir publicação', () => {
  const payload = buildPostPayload({ title: 'T', slug: 't', content: 'x', excerpt: 'x', seo_title: 'x', meta_description: 'x', status: 'published' }, 'cat');
  assert.equal(payload.status, 'draft');
  assert.equal(payload.published_at, null);
});

test('mantém publicação e data bloqueadas no payload', () => {
  const payload = buildPostPayload({ title: 'T', slug: 't', content: 'x', excerpt: 'x', seo_title: 'x', meta_description: 'x' }, 'cat');
  assert.deepEqual({ status: payload.status, published_at: payload.published_at, is_featured: payload.is_featured }, { status: 'draft', published_at: null, is_featured: false });
});

