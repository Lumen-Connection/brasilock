// @ts-check
import { defineConfig } from 'astro/config';

// Para GitHub Pages em subpasta, defina BASE=/brasilock/ no build.
export default defineConfig({
  site: process.env.SITE ?? 'https://brasilock.github.io',
  base: process.env.BASE ?? '/',
  trailingSlash: 'always',
});
