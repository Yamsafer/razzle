import url from 'url';
// import device from 'device'
import getLocale from './getLocale';
import getUserIp from './getUserIp';
import getIsYamsaferIp from './isYamsaferIP';
// import getUserDevice from "./getUserDevice";
import getSessionId from './getSessionId';
import createHistory from './createHistory';
import getCountryCode from './getCountryCode';
import isSupportedBrowser from './isSupportedBrowser';
import getUserAgent, { getParsedUserAgent } from './getUserAgent';
import cookie, { plugToRequest } from 'react-cookie';
import isbot from 'isbot';

import DefaultLayout from '../components/Layout';

const defaultComputeCacheKey = context => null;

export default async function(req, res, configs) {
  const unplug = plugToRequest(req, res);
  const query = req.query;
  const queryString = url.parse(req.url).query;
  const pathname = req.path;
  const locale = getLocale(req);
  const isRTL = locale === 'ar';
  const userIp = getUserIp(req);

  const userAgent = getUserAgent(req);
  const device = { type: 'desktop' }; //device(userAgent);
  console.log({ device });
  const parsedUserAgent = getParsedUserAgent(req);
  const sessionId = cookie.load('sails.sid');
  const history = createHistory(req, res);
  const isYamsaferIp = getIsYamsaferIp(userIp);
  const countryCode = await getCountryCode(req, userIp);
  const isBot = isbot(userAgent);

  const Components = Object.assign(
    {},
    {
      Layout: DefaultLayout,
      // PageNotFound,
      // PageServerError,
      // Providers,
    },
    configs.Components
  );

  const session = {
    query,
    isRTL,
    device,
    locale,
    userIp,
    history,
    ip: userIp,
    countryCode,
    isYamsaferIp,
    id: sessionId,
  };

  const contextConfigs = { locale, device, userAgent, userIp };
  const reactContext = {
    configs: contextConfigs,
    locale,
    userAgent,
    history,
    device,
    isRTL,
    parsedUserAgent,
  };

  const computeCacheKey = configs.computeCacheKey || defaultComputeCacheKey;

  return {
    req,
    res,
    query,
    pathname,
    isBot,
    session,
    reactContext,
    parsedUserAgent,
    computeCacheKey,
    queryString,
    bootstrap: _ => _,
    Components,
    ...configs,
  };
}
