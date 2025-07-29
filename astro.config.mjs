// @ts-nocheck
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server", // SSRを有効に
  adapter: node({ mode: "standalone" }),  // Node.jsで実行する場合は adapter 不要
  site: "https://dddynamis.com", // ← 必須。実際のドメインにすること！
  integrations: [react(), sitemap()],
});
