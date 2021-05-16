export const storeCache = (key: string, dataUri: any) => {
  // Store to cache, then create datauris from its keys
  // use the keys to access the datauris
  fetch(dataUri).then((res) => {
    return caches.open("testCache").then((cache) => {
      console.log("CACHE", cache);
      return cache.put(key, res);
    });
  });
};

export const createDataUri = (blob: any, cb: any) => {
  blob?.then((recoveredBlob: any) => {
    console.log("got", recoveredBlob);
    var reader = new FileReader();
    reader.onload = function () {
      var blobAsDataUrl = reader.result;
      console.log("as data url", blobAsDataUrl);
      cb(blobAsDataUrl);
    };
    reader.readAsDataURL(recoveredBlob);
  });
};

export const getCache = (key = "", cb = (p: any) => {}) => {
  caches.open("testCache").then((cache) => {
    cache.match(key).then((res) => {
      console.log("matched", res);

      createDataUri(res?.blob(), (result: any) => {
        console.log("created datauri", result);
        cb(result);
      });
    });
  });
};

export const getCacheKeys = (cb: any) => {
  caches.open("testCache").then((cache) => {
    cache.keys().then((keys) => {
      const fileNames = keys.map((key) => key.url.replace(/^.*[\\\/]/, ""));
      console.log("filenames", fileNames);
      cb(fileNames);
    });
  });
};
