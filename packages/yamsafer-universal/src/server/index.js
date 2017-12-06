import 'source-map-support/register';
import render from './render';
import createContext from '../utils/createContext';
import createStore from '../utils/createStore';
import createRouter from '../utils/createRouter';
import registerRoute from '../utils/registerRoute';
import resolveRoute from '../utils/resolveRoute';
import fetchData from '../utils/fetchData';
import plugCustomErrors from '../utils/plugCustomErrors';
import onError from './onError';
import bootstrapApp from './bootstrapApp';
import Cache from './CacheManager';
import checkBrowserSupport from '../utils/isSupportedBrowser';

export default function createServer(configs) {
  console.log('INITIAITED');
  return async function(req, res) {
    console.log('Will create context');
    const context = await createContext(req, res, configs);
    console.log('createContext Success');
    const cacheKey = configs.computeCacheKey(context);
    return Cache.getItemAsync(cacheKey, {
      async callback() {
        // if not found in cache!
        return createRouter(context) // can be done only once! not on every request
          .then(checkBrowserSupport)
          .then(createStore)
          .then(bootstrapApp)
          .then(plugCustomErrors)
          .then(resolveRoute)
          .then(registerRoute)
          .then(fetchData)
          .then(render)
          .catch(err => onError(err, req, res, configs));
      },
    });
  };
}
