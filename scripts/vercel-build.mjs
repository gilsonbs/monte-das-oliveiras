import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

const url  = process.env.PUBLIC_SUPABASE_URL      || 'https://cgpowoygdlptumbvjixo.supabase.co';
const key  = process.env.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_W5EEh1O6kKSdJ3mlyqZIFA_Uxgte2wA';
const ga   = process.env.PUBLIC_GA_MEASUREMENT_ID || 'G-FRF66SPD2W';

writeFileSync('.env', `PUBLIC_SUPABASE_URL=${url}\nPUBLIC_SUPABASE_ANON_KEY=${key}\nPUBLIC_GA_MEASUREMENT_ID=${ga}\n`);

console.log('[vercel-build] .env criado, URL:', url.slice(0, 30) + '...');
execSync('npm run build', { stdio: 'inherit' });
