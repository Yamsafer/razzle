import { createStore, applyMiddleware, compose } from 'redux';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import createReducer from './utils/createReducer';

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

const defaultConfigs = {
  reducers: {
    foo: (state, action) => 'bar',
  },
  initialState: {},
  middlewares: [],
};

export default function configureStore(opts) {
  const { reducers, sagas, initialState, middlewares } = Object.assign(
    {},
    defaultConfigs,
    opts
  );

  const sagaMiddleware = createSagaMiddleware();

  const enhancers = [applyMiddleware(...[sagaMiddleware, ...middlewares])];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: true,
        })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(reducers),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  store.runningSagas = [];
  store.asyncReducers = {
    ...reducers,
  };

  store.injectAsyncReducer = injectAsyncReducer.bind(null, store);

  store.cancelRunningSagas = () => {
    store.runningSagas.map(saga => saga.cancel());
    store.runningSagas = []; // reset
  };

  store.runSaga = (saga, options = {}) => {
    store.runningSagas.push(sagaMiddleware.run(saga, store.dispatch));
  };

  // run app sagas
  sagas && store.runSaga(sagas);

  return store;
}
