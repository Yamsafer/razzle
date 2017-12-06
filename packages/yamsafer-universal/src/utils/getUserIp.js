import isBot from 'isbot';
import { SAUDI_IP } from '../constants';

export default function(req, userAgent) {
  const { headers } = req;

  // Because we have dynamic content that depends on user ip
  // and we want to optimize SEO fir Saudi Arabia)
  if (isBot(userAgent)) {
    return SAUDI_IP;
  }

  // Try to read for cloud flare forwareded ip
  const cfConnectingIp = headers['cf-connecting-ip'];
  // If it fails, try the default methods
  const xForwardedFor =
    headers['x-forwarded-for'] && headers['x-forwarded-for'].split(',')[0];
  // If it fails fall back to Saudi Arabia :D
  return cfConnectingIp || xForwardedFor || SAUDI_IP;
}
