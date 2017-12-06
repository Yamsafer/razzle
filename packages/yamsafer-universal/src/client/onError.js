import React from 'react';
import ReactDOM from 'react-dom';
import { FULLSCREEN_ERRORS_DIV } from '../constants';
import { RedBoxError } from 'redbox-react';
import { ERROR_TYPES } from '../utils/CustomErrors';

export default function onError(err, context) {
  console.log(err);

  if (context.onError) {
    err.preventDefault = () => (err.isDefaultPrevented = true);
    context.onError(err, context);
    if (err.isDefaultPrevented) return;
  }

  if (err.type === ERROR_TYPES.AUTHENTICATION || err.status === 401) {
    return console.log('HANDLE AUTH ERRORS');
  }

  if (err.type === ERROR_TYPES.REDIRECTION) {
    const { history } = context;
    return err.url === 'back'
      ? history.goBack()
      : history.push({
          pathname: err.url,
          search: err.search || '',
        });
  }

  if (err.type === ERROR_TYPES.NOT_FOUND) {
    return window.location.reload();
  }

  if (process.env.NODE_ENV === 'production') {
    return window.location.reload();
  }

  const Portal = () =>
    ReactDOM.createPortal(
      <div>
        <RedBoxError error={err} />
      </div>,
      document.querySelector(`#${FULLSCREEN_ERRORS_DIV}`)
    );

  ReactDOM.render(<Portal />, document.querySelector('#app'));
}
