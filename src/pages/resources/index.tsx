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
  const [basePath, setBasePath] = useState("");

  useEffect(() => {
    gameFolders.forEach(initiateFsPath);
  }, []);

  const onImageUploadToFsCache = (event: any) => {
    event.target.files.forEach((file: any) => {
      uploadToFs(file, basePath);
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
      <iframe
        src={`filesystem:${window.location.origin}/persistent`}
        className="w-full h-screen"
        ref={fileSysRef}
        onLoad={() => {
          setBasePath(
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
