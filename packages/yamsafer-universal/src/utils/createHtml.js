import React from 'react';
import ReactDOM from 'react-dom/server';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import App from '../components/App';

import {
  __ERROR_TYPE__,
  SSR_TO_CLIENT_INITIAL_STATE_NAME,
  SSR_TO_CLIENT_CONTEXT_NAME,
  BLOCK_UI_DIV_ID,
  FULLSCREEN_ERRORS_DIV,
} from '../constants';

const createHelmet = helmet => () => [
  helmet.title.toComponent(),
  helmet.meta.toComponent(),
  helmet.link.toComponent(),
];

function createScriptLoaders({ assets, route }) {
  // TODO: `client` here should be a constant that is coupled with the build script
  // assets[config.clientOutputName] mathalan

  const currentScripts = [assets.client.js].concat(
    route.chunkName ? [assets[route.chunkName].js] : []
  );

  const currentPrefetchScripts = route.prefetch || [];
  const prefetchScripts = currentPrefetchScripts
    .filter(chunkName => assets[chunkName])
    .map(chunName => assets[chunName].js);

  const Preload = ({ sources }) =>
    currentScripts
      .concat(sources)
      .map((src, index) => (
        <link rel="preload" as="script" key={index} href={src} />
      ));

  const Scripts = ({ defer, append = [] }) =>
    currentScripts
      .concat(append)
      .map((src, index) => (
        <script type="text/javascript" key={index} src={src} defer={defer} />
      ));

  const Prefetch = ({ append = [] }) =>
    prefetchScripts
      .concat(append)
      .map((src, index) => <link key={index} rel="prefetch" href={src} />);

  return { Scripts, Preload, Prefetch };
}

function createGlobals({ initialState, reactContext, errorType }) {
  const Globals = () => (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.${SSR_TO_CLIENT_INITIAL_STATE_NAME} = ${JSON.stringify(
          initialState
        )};
         window.${SSR_TO_CLIENT_CONTEXT_NAME}= ${JSON.stringify(reactContext)};
         window.${__ERROR_TYPE__} = ${JSON.stringify(errorType)};
        `,
      }}
    />
  );
  return Globals;
}

function createApp({ store, locale, reactContext }) {
  const TheApp = ({ children }) => {
    const asString = ReactDOM.renderToString(
      <App store={store} context={reactContext} locale={locale}>
        {children}
      </App>
    );

    return (
      <div
        id="app"
        style={{ WebkitOverflowScrolling: 'touch' }}
        dangerouslySetInnerHTML={{ __html: asString }}
      />
    );
  };

  return TheApp;
}

export const createHead = () => ({ children }) => {
  return <head>{children}</head>;
};

export const createBody = ({ App, Route, Globals, Scripts, Prefetch }) => ({
  prepend,
  styles = {},
  children,
}) => {
  return (
    <body>
      {children}
      <div id={BLOCK_UI_DIV_ID} />
      <div id={FULLSCREEN_ERRORS_DIV} />
    </body>
  );
};

export default function createFragments({
  assets,
  locale,
  route,
  store,
  reactContext,
  errorType,
}) {
  const initialState = store.getState();
  const Route = () => route.component;
  const App = createApp({ locale, store, reactContext });
  const Globals = createGlobals({ initialState, reactContext, errorType });
  const { Scripts, Preload, Prefetch } = createScriptLoaders({ assets, route });
  const HelmetComponent = createHelmet(Helmet.rewind());
  const Head = createHead({ Preload, Helmet: HelmetComponent });
  const Body = createBody({ App, Route, Globals, Scripts, Prefetch });

  return {
    App,
    Head,
    Body,
    Route,
    Scripts,
    Preload,
    Prefetch,
    Globals,
    Helmet: HelmetComponent,
  };
}
