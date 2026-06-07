import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update this to your custom domain once you have it
export default defineConfig({
  site: 'https://www.twamasi.in',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});
