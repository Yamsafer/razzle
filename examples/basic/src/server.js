import express from 'express';
import { createServer } from 'yamsafer-universal/build/server';

import routes from './routes';
import reducers from './reducers';
import Layout from './Layout';
import Providers from './Providers';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const universalServer = createServer({
  routes,
  assets,
  reducers,
  computeCacheKey: () => null,
  Components: {
    Providers,
    Layout,
    // PageNotFound,
    // PageServerError,
    // Providers,
  },
  // bootstrap: ({ store }) => console.log(store.getState()),
  // hook: (context) => {...context, foo: 'bar'},
});

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    try {
      console.time('Serve Time');
      const { html } = await universalServer(req, res);
      console.timeEnd('Serve Time');
      res.send(`<!doctype html>${html}`);
    } catch (err) {
      console.log(err);
    }
  });

export default server;
