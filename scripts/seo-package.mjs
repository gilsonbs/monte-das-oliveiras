#!/usr/bin/env node
import { execFileSync } from 'node:child_process';

const commitMessage = process.argv.slice(2).join(' ').trim();

if (!commitMessage) {
  console.error('Usage: npm run seo:package -- "Commit message"');
  process.exit(1);
}

const env = {
  ...process.env,
  PUBLIC_SUPABASE_URL:
    process.env.PUBLIC_SUPABASE_URL || 'https://cgpowoygdlptumbvjixo.supabase.co',
  PUBLIC_SUPABASE_ANON_KEY:
    process.env.PUBLIC_SUPABASE_ANON_KEY ||
    'sb_publishable_W5EEh1O6kKSdJ3mlyqZIFA_Uxgte2wA',
  PUBLIC_GA_MEASUREMENT_ID: process.env.PUBLIC_GA_MEASUREMENT_ID || 'G-FRF66SPD2W',
};

function run(command, args, options = {}) {
  console.log(`\n> ${command} ${args.join(' ')}`);
  return execFileSync(resolveCommand(command), args, {
    stdio: 'inherit',
    env,
    ...options,
  });
}

function output(command, args) {
  return execFileSync(resolveCommand(command), args, {
    encoding: 'utf8',
    env,
  }).trim();
}

function resolveCommand(command) {
  if (process.platform !== 'win32') return command;
  if (command === 'npm') return 'npm.cmd';
  if (command === 'git') return 'git.exe';
  return command;
}

const branch = output('git', ['branch', '--show-current']);

if (!branch || branch === 'main') {
  console.error('Create a feature branch before packaging SEO changes.');
  process.exit(1);
}

const status = output('git', ['status', '--short']);

if (!status) {
  console.error('No changes to package.');
  process.exit(1);
}

run('git', ['diff', '--check']);
run('npm', ['run', 'build']);
run('git', ['add', 'src/data/priorityArticleAnswers.ts', 'src/pages/[slug].astro']);
run('git', ['commit', '-m', commitMessage]);
run('git', ['push', '-u', 'origin', branch]);

console.log(`\nPull request link:`);
console.log(`https://github.com/gilsonbs/monte-das-oliveiras/pull/new/${branch}`);
