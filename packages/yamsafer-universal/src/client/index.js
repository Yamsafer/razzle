import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'qs';
import createBrowserHistory from 'history/createBrowserHistory';
import createStore from '../utils/createStore';
import createRouter from '../utils/createRouter';
import registerRoute from '../utils/registerRoute';
import resolveRoute from '../utils/resolveRoute';
import fetchData from '../utils/fetchData';
import { updateSession } from '../ducks/session';
import App from '../components/App';
import onError from './onError';
import restoreScrollPos from './restoreScrollPos';

import {
  __ERROR_TYPE__,
  SSR_TO_CLIENT_INITIAL_STATE_NAME,
  SSR_TO_CLIENT_CONTEXT_NAME,
} from '../constants';
import { blockUI, unBlockUI } from '../';

async function createContext(options) {
  const initialState = window[SSR_TO_CLIENT_INITIAL_STATE_NAME];
  const reactContext = window[SSR_TO_CLIENT_CONTEXT_NAME];
  const errorType = window[__ERROR_TYPE__];

  const Components = Object.assign(
    {},
    {
      Providers: App,
    },
    options.Components
  );

  return Object.assign(
    {},
    {
      // TODO: Use selector here!
      session: initialState.YamsaferUniversal.Session,
      window,
      initialState,
      reactContext,
      errorType,
      options,
      scrollPositionsHistory: {},
    },
    options,
    Components
  ); // TODO: change locations that use options props to use options.props.
}

async function createHistory(context) {
  const { window } = context;
  if (window.history && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  const history = createBrowserHistory();

  const pathname = history.location.pathname;
  const queryString = history.location.search.replace('?', '');
  const query = qs.parse(queryString);
  const lastLocation = history.location;

  return {
    ...context,
    lastLocation,
    history,
    query,
    queryString,
    pathname,
    search: query,
    reactContext: {
      ...context.reactContext,
      history,
    },
  };
}

function checkIntlSupport(context) {
  return new Promise((resolve, reject) => {
    if (!global.Intl) {
      // console.log('This browser does not have Intl Support, loading polyfill....');
      require.ensure(
        [
          'intl',
          'intl/locale-data/jsonp/en.js',
          'intl/locale-data/jsonp/ar.js',
        ],
        require => {
          require('intl');
          require('intl/locale-data/jsonp/en.js');
          require('intl/locale-data/jsonp/ar.js');
          resolve(context);
        }
      );
    } else {
      resolve(context);
    }
  });
}

function shouldIgnoreLocationChange({ currentLocation, nextLocation, action }) {
  const targetFullpath = nextLocation.pathname + nextLocation.search;
  const currentFullPath = currentLocation.pathname + currentLocation.search;
  const isNavigationWithimSameRoute = targetFullpath === currentFullPath;
  return isNavigationWithimSameRoute || action === 'REPLACE';
}

async function cancelRunningTasks(context) {
  const { store } = context;
  store.cancelRunningSagas();
}

function render(context) {
  return new Promise((resolve, reject) => {
    const container = document.getElementById('app');
    const { store, reactContext, route, Components } = context;
    const { component } = route;
    const { Providers } = Components;
    try {
      ReactDOM.render(
        <App store={store} context={reactContext}>
          <Providers context={reactContext}>{component}</Providers>
        </App>,
        container,
        () => resolve(context)
      );
    } catch (err) {
      reject(err);
    }
  });
}

async function reRunSagas(context) {
  return context;
}

async function reActivateSagas(context) {
  const { store, sagas } = context;
  sagas && store.runSaga(sagas);
  return registerRoute(context);
}

async function onRenderComplete(context) {
  const { onRenderComplete } = context.options;
  onRenderComplete && onRenderComplete(context);

  restoreScrollPos({
    scrollPositionsHistory: context.scrollPositionsHistory,
    location: context.history.location,
  });

  return context;
}

async function updateSessionParams(context) {
  const { store, session, history, route, query } = context;
  const { locale, isRTL } = session;
  const payload = {
    query,
    locale,
    isRTL,
    params: route.params,
    history: {
      ...history,
      redirect(to) {
        to === 'back' ? history.goBack() : history.push(to);
      },
    },
  };
  store.dispatch(updateSession(payload));
  return context;
}

async function handleHistoryEvents(context) {
  const { history, store } = context;

  history.listen(async (location, action) => {
    const currentLocation = context.lastLocation;
    const key = location.key;

    context.scrollPositionsHistory[key] = {
      scrollX: window.pageXOffset,
      scrollY: window.pageYOffset,
    };

    if (action === 'PUSH') {
      delete context.scrollPositionsHistory[key];
    }

    const nextLocation = location;

    if (shouldIgnoreLocationChange({ nextLocation, currentLocation, action })) {
      return console.log('Ignoreing location change');
    }

    store.dispatch(blockUI());
    store.cancelRunningSagas();

    context.lastLocation = location;
    context.pathname = nextLocation.pathname;
    context.search = nextLocation.search;
    context.queryString = nextLocation.search.replace('?', '');
    context.query = qs.parse(context.queryString);

    await resolveRoute(context)
      .then(updateSessionParams)
      .then(registerRoute)
      .then(fetchData)
      .then(reActivateSagas)
      .then(render)
      .then(onRenderComplete)
      .catch(err => onError(err, context));

    store.dispatch(unBlockUI());
  });

  return context;
}

function hydrateSSR(context) {
  return new Promise((resolve, reject) => {
    const container = document.getElementById('app');
    const { store, reactContext, route, Components } = context;
    const { component } = route;
    const { Providers } = Components;
    try {
      ReactDOM.hydrate(
        <App store={store} context={reactContext}>
          <Providers context={reactContext}>{component}</Providers>
        </App>,
        container,
        () => resolve(context)
      );
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

async function onHydrationComplete(context) {
  const { onHydrationComplete } = context.options;
  onHydrationComplete && onHydrationComplete(context);
  return context;
}

async function bootstrapApp(context) {
  const { bootstrap } = context;
  bootstrap && bootstrap(context);
  return context;
}

export default async function createClient(options = {}) {
  return createContext(options)
    .then(checkIntlSupport)
    .then(createHistory)
    .then(createStore)
    .then(createRouter)
    .then(bootstrapApp)
    .then(resolveRoute)
    .then(updateSessionParams)
    .then(registerRoute)
    .then(hydrateSSR)
    .then(onHydrationComplete)
    .then(handleHistoryEvents)
    .catch(err => console.log(err));
}
