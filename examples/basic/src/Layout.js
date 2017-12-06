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
