import { RedirectError } from './CustomErrors';

export default async function checkBrowserSupport(context) {
  // const { parsedUserAgent, session : { locale }, pathname, generateUrl } = context;
  // const { browser : { name, version } } = parsedUserAgent;
  //
  // const isNotASupportedBrowser = name === "IE" && version < 11;
  //
  // const path = generateUrl('BrowserNotSupportedRoute');
  // const redirectionUrl = locale === 'en' ? `/en${path}` : path;
  //
  // const isThisTheBrowserNotSupportedPage = pathname === redirectionUrl;
  //
  // if (!isThisTheBrowserNotSupportedPage && isNotASupportedBrowser) {
  //   throw new RedirectError(redirectionUrl, 302);
  // }
  //
  // if (isThisTheBrowserNotSupportedPage && !isNotASupportedBrowser) {
  //   throw new RedirectError(locale === 'en' ? '/en' : '/', 302);
  // }

  return context;
}
