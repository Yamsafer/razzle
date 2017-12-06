// a Yamsafer-Universal user should throw a new PageNotFound() error if he wants to display page not found screen
// To add a custom page not found, the user has to provide it from the confis when he `crateServer` & `createClient`
// To to redirection the user must throw a new RedirectionError({ to: '' });
// Other errors will just render a generic error page, the user can set a custom route for it as well on creation time
// if the user wants to handle errors herself, she must provide and onError function
// if the onError is provided, err.preventDefault(); // will disable default error handling! o hek inshalal ya3ni.
// the user can then send custom responses like this
// res.pageNotFound({ Component: <h1> Page not found ya Moja </h1>  })
// res.serverError({ Component: <h1>  Server error ya Moja </h1>  })
// esh 2olt?
// sounds good

// what about render errors?

import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import { ERROR_TYPES } from '../utils/CustomErrors';

const pe = new PrettyError();

export default function onError(err, req, res, configs) {
  console.log(pe.render(err));

  if (configs.onError) {
    err.preventDefault = () => (err.isDefaultPrevented = true);
    configs.onError(err, req, res, configs);
    if (err.isDefaultPrevented) return;
  }

  if (err.type === ERROR_TYPES.AUTHENTICATION || err.status === 401) {
    return res.send('Must handle authentication errors');
  }

  if (err.type === ERROR_TYPES.REDIRECTION) {
    return res.status(err.statusCode).redirect(err.url);
  }

  if (err.type === ERROR_TYPES.NOT_FOUND) {
    console.log('!!!!!!!!! PAGE NOT FOUND !!!!!!!!!!!!!!!');
    return res.pageNotFound();
  }

  if (process.env.NODE_ENV === 'production') {
    return res.serverError();
  }

  const RedBoxError = require('redbox-react').RedBoxError;
  const errorPage = ReactDOM.renderToStaticMarkup(<RedBoxError error={err} />);
  res.send(`<!doctype html>${errorPage}`);
}
