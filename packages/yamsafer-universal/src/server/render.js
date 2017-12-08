import React from 'react';
import ReactDOM from 'react-dom/server';
import createFragments from '../utils/createHtml';

export default async function(context) {
  const {
    assets,
    route,
    store,
    errorType,
    reactContext,
    Layout: UserLayout,
    session: { locale },
    Components,
  } = context;

  const { Layout, Providers } = Components;

  const Fragments = createFragments({
    Providers,
    route,
    store,
    locale,
    reactContext,
    errorType,
    assets,
  });
  const state = store.getState();
  const renderProps = { state, context, ...Fragments };
  const html = ReactDOM.renderToStaticMarkup(<Layout {...renderProps} />);
  return { html };
}
