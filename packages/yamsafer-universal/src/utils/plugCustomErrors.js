/*
When a 404 error occurs
we should render the page in the same route!
and set response status to 404 so that SEO bots know they should not come here again!
So we want the to
 */

// we want to go through the same contexted lifecycle
// except, we want to render a different route than the one resolved!
// so we intercept the process and replace resolveRoute function with a custom one
// which will return a custom route that is PageNotFound and render it!

import { ERROR_TYPES } from './CustomErrors';
import createStore from './createStore';
import registerRoute from './registerRoute';
import fetchData from './fetchData';
import bootstrapApp from '../server/bootstrapApp';
import render from '../server/render';

export default async function plugCustomErrors(context) {
  const { res, PageNotFound, PageServerError } = context;

  async function renderRoute({ route, errorType, errorStatusCode }) {
    const mutatedContext = {
      ...context,
      errorStatusCode,
      errorType,
      route,
    };

    const { html } = await createStore(mutatedContext)
      .then(bootstrapApp)
      .then(registerRoute)
      .then(fetchData)
      .then(render);

    res.status(errorStatusCode || 200).send(`<!doctype html>${html}`);
  }

  res.pageNotFound = async function() {
    const route = await PageNotFound.action();
    return renderRoute({
      route,
      errorStatusCode: 404,
      errorType: ERROR_TYPES.NOT_FOUND,
    });
  };

  res.serverError = async function() {
    const route = await PageServerError.action();
    return renderRoute({
      route,
      errorStatusCode: 500,
      errorType: ERROR_TYPES.SERVER_ERROR,
    });
  };

  return { ...context, res };
}
