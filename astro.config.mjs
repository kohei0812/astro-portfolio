// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://dddynamis.com',  // ← 必須。実際のドメインにすること！
  integrations: [react(), sitemap()],
});
