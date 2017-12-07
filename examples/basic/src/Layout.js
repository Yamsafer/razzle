import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
  context,
}) {
  const { userAgent } = context;
  console.log({ userAgent });
  const muiTheme = getMuiTheme(
    {},
    {
      userAgent,
    }
  );

  return (
    <html>
      <Head>
        <Helmet />
        <Preload />
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <Body>
        <div id="app">
          <App>
            <MuiThemeProvider muiTheme={muiTheme}>
              <Route />
            </MuiThemeProvider>
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
