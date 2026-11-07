import { readFile } from 'node:fs/promises';
import { parseEditorialPackage } from './openbot-result-contract.mjs';

const [articlePath, carouselPath = ''] = process.argv.slice(2);
if (!articlePath) throw new Error('Informe o caminho do README.md.');
const parsed = parseEditorialPackage(await readFile(articlePath, 'utf8'));
if (!parsed.ok) throw new Error(parsed.errors.join(' '));
const carousel = carouselPath ? await readFile(carouselPath, 'utf8') : '';
process.stdout.write(JSON.stringify({
  article: parsed.article,
  social_package: carousel ? { type: 'carousel', status: 'draft', markdown: carousel } : null,
}));
