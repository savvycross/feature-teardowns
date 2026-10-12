import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://useteardowns.xyz',
  markdown: {
    // Code blocks are styled by our own CSS (the prompt box), not a highlighter.
    syntaxHighlight: false,
  },
});
