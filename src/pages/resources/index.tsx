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
const Resources = ({ blobs, setBlobs }: any) => {
  const fileSysRef = useRef(null);
  const [basePath, setBasePath] = useState("");

  useEffect(() => {
    gameFolders.forEach(initiateFsPath);
  }, []);

  console.log(blobs);
  const uploadToBlob = (file: any) => {
    const blobUrl = URL.createObjectURL(file);
    console.log("bloby", file, blobUrl);
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function () {
      var recoveredBlob = xhr.response;
      var reader = new FileReader();
      reader.onload = function () {
        var blobAsDataUrl = reader.result;
        console.log("as data url", blobAsDataUrl);
        setBlobs({
          scenes: {
            ...blobs.scenes,
            //@ts-ignore
            [file.name.replace(".png", "")]: (blobAsDataUrl || "").replace(
              "data:",
              ""
            ),
          },
        });
        // window.location = blobAsDataUrl;
      };

      reader.readAsDataURL(recoveredBlob);
    };

    xhr.open("GET", blobUrl);
    xhr.send();
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
      {Object.keys(blobs.scenes).map((key) => (
        <div key={key}>{key}</div>
      ))}
    </div>
  );
};

export default Resources;
