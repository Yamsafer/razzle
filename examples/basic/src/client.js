import createClient from 'yamsafer-universal/build/client';

import routes from './routes';
import reducers from './reducers';
import Layout from './Layout';
import Providers from './Providers';

createClient({
  routes,
  reducers,
  bootstrap() {
    // console.log('bootstrap called');
  },
  Components: {
    Providers,
    Layout,
    // PageNotFound,
    // PageServerError,
    // Providers,
  },
  // middlewares,
  // PageNotFound,
  // PageServerError,
  // onError,
  onRenderComplete() {
    // console.log('onRenderComplete');
  },
  onHydrationComplete() {
    // console.log('onHydrationComplete')
  },
});

if (module.hot) {
  module.hot.accept();
}

// import React from 'react';
// import { hydrate } from 'react-dom';
// import App from './App';
//
// hydrate(<App />, document.getElementById('root'));
//
// if (module.hot) {
//   module.hot.accept();
// }
