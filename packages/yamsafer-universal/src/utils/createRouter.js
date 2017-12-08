import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';

export default async function createRouter(context) {
  const { routes, protectedRouteRedirectUrl } = context;
  const router = new UniversalRouter(routes, {
    resolveRoute(routeResolveContext, params) {
      const { route, pathname, isUserLoggedIn } = routeResolveContext;
      // TODO: Define routeResolveContext.isUserLoggedIn
      if (route.protected && !isUserLoggedIn) {
        return {
          redirect: protectedRouteRedirectUrl || '/en/signup',
          from: pathname,
        };
      }

      if (typeof route.action === 'function') {
        return route.action(routeResolveContext, params);
      }

      return undefined;
    },
  });
  return {
    ...context,
    router,
    generateUrl: generateUrls(router),
  };
}
