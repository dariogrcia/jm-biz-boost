import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // Honor the Vite base path so routing works when the app is served from a
  // sub-path (e.g. GitHub Pages project site at /jm-biz-boost/). BASE_URL is
  // "/" in dev and the configured base in production builds.
  const basepath = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

  const router = createRouter({
    routeTree,
    context: { queryClient },
    basepath,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
