// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://montedasoliveiras.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/'),
    }),
  ],
  vite: {
    define: {
      'import.meta.env.PUBLIC_SUPABASE_URL':      JSON.stringify(process.env.PUBLIC_SUPABASE_URL      ?? ''),
      'import.meta.env.PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(process.env.PUBLIC_SUPABASE_ANON_KEY ?? ''),
      'import.meta.env.PUBLIC_GA_MEASUREMENT_ID': JSON.stringify(process.env.PUBLIC_GA_MEASUREMENT_ID ?? ''),
    },
  },
});
