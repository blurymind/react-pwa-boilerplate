const { Base64 } = require("js-base64");

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

export const getCacheData = (key = "", cb = (p: any) => {}) => {
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

export const getAllCacheBlobs = async (cb: any, asBase64 = false) => {
  caches.open("testCache").then((cache) => {
    // cb(cache);
    cache.keys().then((keys) => {
      const blobs: any = {};
      // return keys;
      keys.forEach((key) => {
        const fileKey = key.url.replace(/^.*[\\\/]/, "");
        cache
          .match(fileKey)
          .then((res) => {
            console.log("matched", fileKey, res);

            if (asBase64) {
              return res?.blob();
            } else
              getCacheData(fileKey, (data) => {
                blobs[fileKey] = { content: data, name: fileKey };
              });
          })
          .then((blob) => {
            // console.log("BLOB", blob);
            blobs[fileKey] = {
              content: blob,
              name: fileKey,
            };

            // var reader = new FileReader();
            // reader.readAsDataURL(blob as any);
            // reader.onloadend = function () {
            //   var content = reader.result;
            //   console.log("BASE64", content);
            //   //@ts-ignore
            //   const result = content.substr(content.indexOf(",") + 1);
            //
            //   blobs[fileKey] = {
            //     content: result,
            //     encoding: "base64",
            //   };
            // };
          });
      });
      setTimeout(() => {
        console.log("blobs", blobs);
        cb(blobs);
      }, 1000);
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

export const binaryStringToByteArray = (s: any) => {
  var result = new Uint8Array(s.length);
  for (var i = 0; i < s.length; i++) {
    result[i] = s.charCodeAt(i);
  }
  return result;
};
