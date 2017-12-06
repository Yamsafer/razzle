import React from 'react';

function Layout({
  App,
  Head,
  Body,
  Route,
  Scripts,
  Preload,
  Prefetch,
  Globals,
  Helmet,
}) {
  return (
    <html>
      <Head>
        <Helmet />
        <Preload />
      </Head>
      <Body>
        <div id="app">
          <App>
            <Route />
          </App>
        </div>
        <Globals />
        <Scripts />
        <Prefetch />
      </Body>
    </html>
  );
}

export default Layout;
