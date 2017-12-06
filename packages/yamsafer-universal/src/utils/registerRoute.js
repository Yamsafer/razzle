export function injectRouteReducers(store, route) {
  const { name, reducer, prepareNext } = route;
  name && reducer && store.injectAsyncReducer(name, reducer);
  if (prepareNext) {
    const { stateName, reducer: prepareNextReducer } = prepareNext;
    store.injectAsyncReducer(stateName, prepareNextReducer);
  }
}

export function injectRouteSagas(store, route) {
  const { saga, prepareNext } = route;
  saga && store.runSaga(saga);
  prepareNext && prepareNext.saga && store.runSaga(prepareNext.saga);
}

export default async function registerRoute(context) {
  const { store, route } = context;
  injectRouteSagas(store, route);
  injectRouteReducers(store, route);
  return context;
}
