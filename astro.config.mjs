import { defineConfig, sharpImageService } from "astro/config";
import NetlifyCMS from "@jee-r/astro-decap-cms";
import cmsConfig from "./src/cms";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://decapcms.org/docs/beta-features/#folder-collections-media-and-public-folder
// import netlify from "@astrojs/netlify";
// import node from "@astrojs/node";
// import { loadEnv } from "vite";
// const { BASE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
// https://astro.build/config
export default defineConfig({
  site: "https://p.roocker.dev/ae30/",
  // base: BASE_URL,
  // base: "/ae30",
  // output: "hybrid",
  // adapter: netlify({ edgeMiddleware: true }),
  // adapter: node({ mode: "standalone", }),
  image: {
    service: sharpImageService(),
  },
  integrations: [
    // SETTINGS -----------------------------------------------
    NetlifyCMS({
      adminPath: "/admin",
      previewStyles: ["/src/styles/preview.css"],
      disableIdentityWidgetInjection: true,
      config: cmsConfig,
    }),
    mdx(),
    sitemap(),
    react(),
  ],
});
