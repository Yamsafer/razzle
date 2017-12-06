export const ERROR_TYPES = {
  NOT_FOUND: 'NotFound',
  REDIRECTION: 'Redirection',
  SERVER_ERROR: 'ServerError',
  AUTHENTICATION: 'Authentication',
  BROWSER_NOT_SUPPORTED: 'BrowserNotSupported',
  SERVING_FROM_CACHE: 'ServingFromCache',
  IGNORE_LOCATION_CHANGE: 'IgnoreLocationChange',
};

export class IgnoreLocationChange extends Error {
  constructor(...params) {
    super(...params);
    Error.captureStackTrace(this, IgnoreLocationChange);
    this.type = ERROR_TYPES.IGNORE_LOCATION_CHANGE;
  }
}

export class ServingFromCache extends Error {
  constructor(data = null, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);
    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, RedirectError);
    this.type = ERROR_TYPES.SERVING_FROM_CACHE;
    this.data = data;
  }
}

export class RedirectError extends Error {
  constructor(url = '/', statusCode = 301, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);
    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, RedirectError);
    this.type = ERROR_TYPES.REDIRECTION;
    this.url = url;
    this.statusCode = statusCode;
  }
}

export class PageNotFound extends Error {
  constructor(params) {
    super(params);
    Error.captureStackTrace(this, PageNotFound);
    this.type = ERROR_TYPES.NOT_FOUND;
  }
}

export class AuthenticationError extends Error {
  constructor(params) {
    super(params);
    Error.captureStackTrace(this, AuthenticationError);
    this.type = ERROR_TYPES.AUTHENTICATION;
  }
}

export class BrowserNotSupported extends Error {
  constructor(params) {
    super(params);
    Error.captureStackTrace(this, BrowserNotSupported);
    this.type = ERROR_TYPES.BROWSER_NOT_SUPPORTED;
  }
}
