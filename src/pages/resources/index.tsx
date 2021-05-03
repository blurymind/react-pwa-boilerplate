import React, { useEffect, useRef, useState } from "react";
import { initiateFsPath, uploadToFs } from "@helpers/filesys-api";

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
const Resources = () => {
  const fileSysRef = useRef(null);
  const [iframeUrl, setIframeUrl] = useState(
    `filesystem:${window.location.origin}/persistent/base`
  );

  //@ts-ignore
  console.log(process.env, window.location.host, window.location.origin);

  useEffect(() => {
    gameFolders.forEach(initiateFsPath);
    // initiateFsPath();
  }, []);

  const onImageChange = (event: any) => {
    event.target.files.forEach((file: any) => {
      uploadToFs(file, iframeUrl);
    });
    setTimeout(() => {
      //@ts-ignore
      fileSysRef.current?.contentDocument.location.reload(true);
    }, 500);
  };
  return (
    <div>
      upload:
      <input type="file" onChange={onImageChange} multiple />
      {iframeUrl.includes("/") && (
        <input
          type="button"
          value="Back"
          onClick={() => {
            //@ts-ignore
            fileSysRef.current?.contentWindow.history.go(-1);
          }}
        />
      )}
      {iframeUrl}
      <iframe
        src={`filesystem:${window.location.origin}/persistent/base`}
        className="w-full h-screen"
        ref={fileSysRef}
        onLoad={() => {
          setIframeUrl(
            //@ts-ignore
            fileSysRef.current?.contentWindow.location.pathname.slice(1, -1)
          );
          //@ts-ignore
          console.log(fileSysRef.current?.contentWindow);
        }}
      />
    </div>
  );
};

export default Resources;
