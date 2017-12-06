import React from 'react';
import ReactDOMServer from 'react-dom/server';

import LRU from 'lru-cache';

const cache = LRU({
  max: 500,
  maxAge: 1000 * 60 * 60,
});

class Cache extends React.Component {
  constructor(props, context) {
    super(props);
  }
  render() {
    const { cacheKey, children } = this.props;
    // if not key
    // or if this is a browser render
    if (!cacheKey || typeof window !== 'undefined') {
      console.log('return, it is a browser');
      // Return children as is!
      return children;
    }

    // if not cached yet
    if (!cache[cacheKey]) {
      console.log('not cached');
      // Cache as string
      cache[cacheKey] = (
        <ins
          dangerouslySetInnerHTML={{
            __html: ReactDOMServer.renderToString(children),
          }}
        />
      );
    }

    console.log('return from cached');
    // return from cache
    return cache[cacheKey];
  }
}

export default Cache;
