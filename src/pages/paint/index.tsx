import React, { useEffect, useRef, useState } from "react";
import "chickenpaint/resources/css/chickenpaint.css";
import {
  getCacheKeys,
  storeCache,
  binaryStringToByteArray,
  getCacheData,
} from "@helpers/cache";
import useLocalStorage from "@hooks/use-local-storage";

const ChickenPaint = require("chickenpaint");
const { save } = require("chickenpaint/js/engine/CPChibiFile.js");

export function Paint() {
  const chickRef: any = useRef(null);
  const [currentChick, setCurrentChick] = useLocalStorage(
    "currentChick",
    "new"
  );
  const [chickWidgetPositions, setChickWidgetPositions] = useLocalStorage(
    "chickWidgetPositions",
    {}
  );

  const storeUserInterfaceState = () => {
    const styles: any = {};
    [].slice
      .call(document.getElementsByClassName("chickenpaint-palette"))
      .forEach((element: any) => {
        styles[element.getAttribute("class")] = element.style.cssText;
      });

    console.log("stored styles", styles);
    setChickWidgetPositions(styles);
  };
  useEffect(() => {
    setTimeout(() => {
      getCacheKeys((storedFiles: any) => {
        console.log(currentChick, storedFiles);

        let loadChiOrPngUrl = "";
        if (storedFiles.includes(currentChick + ".chi")) {
          // alert("Has been saved");
          // attempt to load it into chickenpaint from cache
          console.log("Attempting to load", currentChick + ".chi");
          getCacheData(currentChick + ".chi", (dataUri: string) => {
            console.log("DATAuri", dataUri);
            chickRef.current = new ChickenPaint({
              uiElem: document.getElementById("chickenpaint-parent"),
              loadChibiFileURL:
                "http://localhost:3000/react-pwa-boilerplate/newfgg.chi", //dataUri, // <- doesnt seem to like this url
              // saveUrl: "save.php",
              // postUrl: "complete.php",
              // exitUrl: "index.php",
              // resourcesRoot: "chickenpaint/",
            });
            // monogatari.assets("scenes", cachedScenes);
          });
        } else {
          console.log("NEW FILE");
          chickRef.current = new ChickenPaint({
            uiElem: document.getElementById("chickenpaint-parent"),
            // saveUrl: "save.php",
            // postUrl: "complete.php",
            // exitUrl: "index.php",
            // resourcesRoot: "chickenpaint/",
          });
        }

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

            console.log(
              chickRef.current?.getArtwork(),
              chickRef.current?.artwork
                .getLayersRoot()
                .getLinearizedLayerList(false)
            );
            // save chi file
            save(chickRef.current?.getArtwork()).then((chibiResult: any) => {
              console.log("Layered saved:", chibiResult);
              const blobUrl = URL.createObjectURL(chibiResult.bytes);
              storeCache(
                (nameInput.value || nameInput.placeholder || "chickenPaint") +
                  ".chi",
                blobUrl
              );
            });
          };
          document
            .getElementsByClassName(
              "navbar navbar-expand-md navbar-light bg-light"
            )[0]
            .appendChild(saveButton);

          console.log(chickRef.current);

          // we could also do this on input and add it to input's autocompletion

          // restore chick Positions
          // console.log("STYLES LOADED", chickWidgetPositions);
          Object.entries(chickWidgetPositions).forEach(([key, value]: any) => {
            //@ts-ignore
            document.getElementsByClassName(key)[0].style = value;
          });
        }, 100);
      });
    }, 100);

    //unmount
    return () => {};
  }, []);
  return (
    <div
      id="chickenpaint-parent"
      className="flex-1"
      onPointerUp={storeUserInterfaceState}
    />
  );
}

export default Paint;
