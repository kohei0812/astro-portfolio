// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://yourdomain.com',  // ← 必須。実際のドメインにすること！
  integrations: [react(), sitemap()],
});
