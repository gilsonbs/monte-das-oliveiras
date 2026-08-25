import { execSync } from 'child_process';

const url = process.env.PUBLIC_SUPABASE_URL      || 'https://cgpowoygdlptumbvjixo.supabase.co';
const key = process.env.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_W5EEh1O6kKSdJ3mlyqZIFA_Uxgte2wA';
const ga  = process.env.PUBLIC_GA_MEASUREMENT_ID || 'G-FRF66SPD2W';

process.env.PUBLIC_SUPABASE_URL      = url;
process.env.PUBLIC_SUPABASE_ANON_KEY = key;
process.env.PUBLIC_GA_MEASUREMENT_ID = ga;

console.log('[vercel-build] Env vars prontos, iniciando build...');
execSync('npm run build', { stdio: 'inherit' });
