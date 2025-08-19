// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://medcalfsoftwaresolutions.com',
  integrations: [sitemap(), mermaid()],
});
