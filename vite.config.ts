import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [remix({
    routes(defineRoutes) {
      return defineRoutes((route) => {
        route("blog", "modules/blog/routes/index.tsx", { index: true });
        route("photography", "modules/photography/routes/index.tsx", { index: true });
        route("work", "modules/work/routes/index.tsx", { index: true });
      });
    },
    future: {
      unstable_singleFetch: true
    }
  }), tsconfigPaths(), tailwindcss()],
});
