import React from 'react';
import ReactDOM from 'react-dom/server';
import createFragments from '../utils/createHtml';
import DefaultLayout from '../components/Layout';

export default async function(context) {
  const {
    assets,
    route,
    store,
    errorType,
    reactContext,
    Layout: UserLayout,
    session: { locale },
  } = context;
  const Fragments = createFragments({
    route,
    store,
    locale,
    reactContext,
    errorType,
    assets,
  });
  const state = store.getState();
  const Layout = UserLayout || DefaultLayout;
  const renderProps = { state, context, ...Fragments };
  const html = ReactDOM.renderToStaticMarkup(<Layout {...renderProps} />);
  return { html };
}
