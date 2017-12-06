import ua from 'ua-parser-js';

export const parseUserAgent = userAgent => ua(userAgent);

export const getParsedUserAgent = req => parseUserAgent(getUserAgent(req));

export default function getUserAgent(req) {
  const { headers } = req;
  return headers['user-agent'] || headers['User-Agent'];
}
