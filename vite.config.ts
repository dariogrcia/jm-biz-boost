import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // Base public path. On GitHub Pages (project site) the app is served from
  // /<repo>/, so CI sets BASE_PATH=/jm-biz-boost/. Local dev/build default to "/".
  base: process.env.BASE_PATH || "/",

  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Fail the build if client code imports a server-only module.
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR
      // error wrapper). nitro/vite builds from this.
      server: { entry: "server" },
    }),
    viteReact(),
  ],

  // Match the build's CSS pipeline in dev. Vite runs PostCSS in dev and Lightning
  // CSS at build, so a build-time transform can break the static output while the
  // dev preview looks fine. Running Lightning CSS in both keeps the preview honest.
  css: { transformer: "lightningcss" },

  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    // A second copy of React or the Query client breaks hydration and context.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },

  // Dep re-optimization rotates the optimized-dep hash and 504s tabs holding the
  // old one; pre-bundle the always-present client deps and tolerate stale requests.
  // React core only — pulling in @tanstack/react-start would drag its
  // node:async_hooks server entry into the client bundle and crash hydration.
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
    ignoreOutdatedRequests: true,
  },

  server: {
    host: "::",
    port: 8080,
    // Editors write in several passes; wait for the file to settle before reloading.
    watch: { awaitWriteFinish: { stabilityThreshold: 1000, pollInterval: 100 } },
  },
});
