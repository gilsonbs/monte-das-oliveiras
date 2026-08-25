import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

const { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_GA_MEASUREMENT_ID } = process.env;

console.log('[vercel-build] PUBLIC_SUPABASE_URL presente:', !!PUBLIC_SUPABASE_URL);
console.log('[vercel-build] PUBLIC_SUPABASE_ANON_KEY presente:', !!PUBLIC_SUPABASE_ANON_KEY);

writeFileSync('.env', [
  `PUBLIC_SUPABASE_URL=${PUBLIC_SUPABASE_URL ?? ''}`,
  `PUBLIC_SUPABASE_ANON_KEY=${PUBLIC_SUPABASE_ANON_KEY ?? ''}`,
  `PUBLIC_GA_MEASUREMENT_ID=${PUBLIC_GA_MEASUREMENT_ID ?? ''}`,
].join('\n') + '\n');

console.log('[vercel-build] .env criado');
execSync('npm run build', { stdio: 'inherit' });
