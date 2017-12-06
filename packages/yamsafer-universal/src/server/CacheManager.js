import InMemoryCache from 'aws-amplify/lib/Cache/InMemoryCache';

const myCache = InMemoryCache.createInstance({
  capacityInBytes: 5242880,
  itemMaxSize: 900000,
});

myCache.getItemAsync = async function(key, opts) {
  try {
    const { callback, ...options } = opts;
    const item = myCache.getItem(key, options);
    // console.log(`~~~~~~~~~~~~~ ${key} ~~~~~~~~~~~~~~~~`);
    if (item) {
      // console.log('~~~~~~~~~~~~~ SERVING FROM CACHE ~~~~~~~~~~~~~~~~');
      return { html: item };
    }

    if (callback !== undefined) {
      // console.log('~~~~~~~~~~~~~ START RENDERING ~~~~~~~~~~~~~~~~');
      var { html } = await callback();
      // We will not cache if they key is null!
      if (key !== null) {
        // console.log('~~~~~~~~~~~~~ SAVING TO CACHE ~~~~~~~~~~~~~~~~');
        myCache.setItem(key, html, options);
      }
      // console.log('~~~~~~~~~~~~~ RETURN RESULT ~~~~~~~~~~~~~~~~');
      return { html };
    }

    return null;
  } catch (err) {
    console.log('NOT CACHING, AN ERROR OCCURED');
    return null;
  }
};

export default myCache;

// console.log('Serving From Cache');
// console.log('Cache Size', myCache.getCacheCurSize())
// console.log('Keys', myCache.getAllKeys());
