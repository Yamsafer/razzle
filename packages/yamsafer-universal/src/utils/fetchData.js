import { END } from 'redux-saga';

function getPreloadActionsFromRoute(route) {
  const { prepareNext, component, preload = [] } = route;
  const { type: { preload: legacyRoutePreload = [] } } = component;
  return preload
    .concat(legacyRoutePreload)
    .concat((prepareNext && prepareNext.preload) || []);
}

function preload({ dispatch, actions, payload }) {
  actions.forEach(action => dispatch(action(payload)));
}

export default async function fetchData(context) {
  const {
    route,
    store,
    preventPreload,
    history,
    session,
    pathname,
    query,
    queryString,
  } = context;

  if (!preventPreload) {
    // 1. dispatch all preload actiosn (the running sagas will receive them)
    preload({
      payload: {
        ...session,
        pathname,
        query,
        queryString,
        params: route.params,
      },
      dispatch: store.dispatch,
      actions: getPreloadActionsFromRoute(route),
    });

    // 2. Tell the running sagas that there will be no more actions (so they can resolve)
    store.dispatch(END);

    // 3. This is good on the server side because now we want to render and send response to client
    // 4. But on the client, we need to run the route sagas again, check `client/index.js`
    // TODO: setPrepareNextKey
    // if (route.prepareNext && route.prepareNext.key) {
    //   store.dispatch(setPrepareNextKey(route.prepareNext.key));
    // }
  }

  // 5. we wait for all sagas to finish, means we have all the data and state is populated
  await Promise.all(store.runningSagas.map(saga => saga.done));

  return context;
}
