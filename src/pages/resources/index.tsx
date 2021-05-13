import React, { useEffect, useRef, useState } from "react";
import { initiateFsPath } from "@helpers/filesys-api";

// try to copy this https://github.com/lostintangent/gistpad/blob/01a3ac2ae3a25f86d78eb09d7aeda3aeeba8ea97/src/fileSystem/git.ts#L35
const gameFolders = [
  "characters",
  "scenes",
  "images",
  "icons",
  "sounds",
  "ui",
  "videos",
  "voices",
  "gallery",
];

const storeCache = (key: string, dataUri: any) => {
  // Store to cache, then create datauris from its keys
  // use the keys to access the datauris
  fetch(dataUri).then((res) => {
    return caches.open("testCache").then((cache) => {
      console.log("CACHE", cache);
      return cache.put(key, res);
    });
  });
};
const createDataUri = (blob: any, cb: any) => {
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
const Resources = ({ blobs, setBlobs }: any) => {
  const fileSysRef = useRef(null);
  const [basePath, setBasePath] = useState("");
  useEffect(() => {
    gameFolders.forEach(initiateFsPath);
  }, []);

  console.log("blobs", blobs);

  const uploadToBlob = (file: any) => {
    const blobUrl = URL.createObjectURL(file);
    storeCache(file.name, blobUrl);
    setBlobs({
      scenes: [...blobs.scenes, file.name],
    });
  };
  const onImageUploadToFsCache = (event: any) => {
    event.target.files.forEach((file: any) => {
      uploadToBlob(file);
      // uploadToFs(file, basePath);
    });
    setTimeout(() => {
      //@ts-ignore
      fileSysRef.current?.contentDocument.location.reload(true);
    }, 500);
  };
  return (
    <div>
      <input type="file" onChange={onImageUploadToFsCache} multiple /> ↴
      {!!basePath && (
        <input
          type="button"
          value="root/ "
          onClick={() => {
            //@ts-ignore
            fileSysRef.current?.contentWindow.history.go(-1);
          }}
          className="bg-yellow-400 rounded-md p-1 mr-3"
        />
      )}
      {basePath}
      {blobs.scenes.map((key: any) => (
        <div key={key}>{key}</div>
      ))}
    </div>
  );
};

export default Resources;
