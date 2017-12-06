import configureStore from '../configureStore';

export default async function createStore(context) {
  const { reducers, sagas, middlewares = [], initialState } = context;
  const store = configureStore({ reducers, sagas, middlewares, initialState });
  return { ...context, store };
}
