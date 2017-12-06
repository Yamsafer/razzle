import { ERROR_TYPES } from './CustomErrors';

export default async function resolveRoute(context) {
  const {
    router,
    session,
    pathname,
    search,
    query,
    errorType,
    PageNotFound,
    PageServerError,
  } = context;

  if (errorType && errorType === ERROR_TYPES.NOT_FOUND) {
    const route = await PageNotFound.action();
    return {
      ...context,
      route,
    };
  }

  if (errorType && errorType === ERROR_TYPES.SERVER_ERROR) {
    const route = await PageServerError.action();
    return {
      ...context,
      route,
    };
  }

  const route = await router.resolve({
    pathname,
    search,
    query,
    session,
  });

  return {
    ...context,
    route,
  };
}
