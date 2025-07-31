// @ts-nocheck
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server", // SSRを有効に
  adapter: node({ mode: "standalone" }),
  site: "https://dddynamis.com",
  integrations: [react(), sitemap()],
  compressHTML: false,
  vite: {
    build: {
      minify: false,
    }
  }
});
