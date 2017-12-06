import { FALLBACK_COUNTRY, DEVELOPMENT_COUNTRY } from '../constants';

// This reads from a custom header set by cloudflare
// XX means cloudlfare could not get country code
// T1 means the user is using TOR network
const getCountryCodeFromReq = req => {
  const { headers } = req;
  const cfIpcountry = headers['cf-ipcountry'];
  return cfIpcountry && cfIpcountry !== 'XX' && cfIpcountry !== 'T1'
    ? cfIpcountry
    : null;
};

async function getCountryCodeFromIp(userIp) {
  const algoliasearch = require('algoliasearch');
  const client = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_KEY);
  const suggestions = client.initIndex('suggestions');
  client.setExtraHeader('x-forwarded-for', userIp);
  const { hits } = await suggestions.search('', {
    getRankingInfo: 0,
    facets: 'type',
    attributesToRetrieve: ['info.currency_code', 'info.country_code'],
    hitsPerPage: 1,
    facetFilters: ['type:City'],
    aroundLatLngViaIP: true,
    aroundRadius: 10000,
  });
  const match = hits[0];
  return match.info.country_code;
}

export default async function getCountryCode(req, userIp) {
  if (process.env.NODE_ENV === 'development') {
    return DEVELOPMENT_COUNTRY;
  }
  const fromReq = getCountryCodeFromReq(req);
  if (fromReq) {
    return fromReq;
  } else {
    try {
      return await getCountryCodeFromIp(userIp);
    } catch (err) {
      return FALLBACK_COUNTRY;
    }
  }
}
