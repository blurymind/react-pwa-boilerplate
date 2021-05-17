import React, { useEffect, useRef, useState } from "react";
import "chickenpaint/resources/css/chickenpaint.css";
import {
  getCacheKeys,
  storeCache,
  binaryStringToByteArray,
} from "@helpers/cache";
import useLocalStorage from "@hooks/use-local-storage";

const ChickenPaint = require("chickenpaint");

export function Paint() {
  const chickRef: any = useRef(null);
  const [currentChick, setCurrentChick] = useLocalStorage(
    "currentChick",
    "new"
  );
  useEffect(() => {
    // document.addEventListener("DOMContentLoaded", function (event: any) {
    //   console.log("LOAD", ChickenPaint);
    //   new ChickenPaint({
    //     uiElem: document.getElementById("chickenpaint-parent"),
    //     // saveUrl: "save.php",
    //     // postUrl: "complete.php",
    //     // exitUrl: "index.php",
    //     // resourcesRoot: "chickenpaint/",
    //   });
    // });
    setTimeout(() => {
      chickRef.current = new ChickenPaint({
        uiElem: document.getElementById("chickenpaint-parent"),
        // saveUrl: "save.php",
        // postUrl: "complete.php",
        // exitUrl: "index.php",
        // resourcesRoot: "chickenpaint/",
      });
      setTimeout(() => {
        const toRemove = document.getElementsByClassName("navbar-brand")[0];
        toRemove.remove();
        const nameInput = document.createElement("input");
        nameInput.id = "fileNameInput";
        nameInput.placeholder = "new";
        nameInput.value = currentChick;

        document
          .getElementsByClassName(
            "navbar navbar-expand-md navbar-light bg-light"
          )[0]
          .appendChild(nameInput);
        nameInput.addEventListener("input", (event: any) => {
          console.log(event.target.value);
          setCurrentChick(event.target.value);
        });

        const saveButton = document.createElement("button");
        saveButton.id = "saveBtn";
        saveButton.textContent = "save";
        saveButton.onclick = () => {
          console.log(chickRef.current, chickRef.current?.getArtwork());
          const flat = binaryStringToByteArray(
            chickRef.current?.getArtwork().getFlatPNG()
          );
          const flatBlob = new Blob([flat], { type: "image/png" });
          const blobUrl = URL.createObjectURL(flatBlob);
          // console.log(blob, blobUrl);
          storeCache(
            (nameInput.value || nameInput.placeholder || "chickenPaint") +
              ".png",
            blobUrl
          );
        };
        document
          .getElementsByClassName(
            "navbar navbar-expand-md navbar-light bg-light"
          )[0]
          .appendChild(saveButton);

        console.log(chickRef.current);

        // we could also do this on input and add it to input's autocompletion
        getCacheKeys((storedFiles: any) => {
          console.log(currentChick, storedFiles);
          if (storedFiles.includes(currentChick + ".png")) {
            // alert("Has been saved");
            // attempt to load it into chickenpaint from cache
          }
        });
      }, 100);
    }, 100);
  }, []);
  return <div id="chickenpaint-parent" className="flex-1" />;
}

export default Paint;
