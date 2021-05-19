import React, { useEffect, useRef } from "react";
import { Swal } from "@helpers/gist";

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
  const [chiCanvasSize, setChiCanvasSize] = useLocalStorage("chiCanvasSize", {
    width: 600,
    height: 300,
  });

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

  const askNewFileSize = async () => {
    const { value: formValues } = await Swal.fire({
      title: `New file "${currentChick}":`,
      html:
        '<div className="flex flex-column">' +
        `<div>width: <input id="swal-input1" class="swal2-input" value="${chiCanvasSize.width}" type="number" min="5"></div>` +
        `<div>height: <input id="swal-input2" class="swal2-input" value="${chiCanvasSize.height}" type="number" min="5"></div>` +
        "</div>",
      focusConfirm: false,
      preConfirm: () => {
        return [
          //@ts-ignore
          document.getElementById("swal-input1")?.value,
          //@ts-ignore
          document.getElementById("swal-input2")?.value,
        ];
      },
    });

    if (formValues) {
      return formValues;
    }
  };

  useEffect(() => {
    if (chickRef.current !== null) {
      console.log("CHI SIZE", chiCanvasSize);
      startClucking(true);
    }
  }, [chiCanvasSize]);

  const startClucking = (sizeWasSet = false) => {
    setTimeout(() => {
      getCacheKeys((storedFiles: any) => {
        const fileKey = storedFiles.includes(currentChick + ".chi")
          ? currentChick + ".chi"
          : storedFiles.includes(currentChick + ".png")
          ? currentChick + ".png"
          : "";
        console.log(storedFiles, fileKey, currentChick);
        if (fileKey) {
          getCacheData(fileKey, (dataUri: string) => {
            chickRef.current = new ChickenPaint({
              uiElem: document.getElementById("chickenpaint-parent"),
              [fileKey.includes(".chi")
                ? "loadChibiFileUrl"
                : "loadImageUrl"]: dataUri,
            });
          });
        } else {
          if (!sizeWasSet) {
            askNewFileSize().then((result: any) => {
              console.log(result);
              // chickRef.current = new ChickenPaint({
              //   uiElem: document.getElementById("chickenpaint-parent"),
              //   canvasWidth: result?.width || 300,
              //   canvasHeight: result?.height || 200,
              // });
              const [width, height] = result;
              console.log(width, "x");
              setChiCanvasSize({
                width: width,
                height: height,
              });
              // setTimeout(() => startClucking(), 100);
              // alert("waho");
              return;
            });
          }

          chickRef.current = new ChickenPaint({
            uiElem: document.getElementById("chickenpaint-parent"),
            canvasWidth: chiCanvasSize?.width || 300,
            canvasHeight: chiCanvasSize?.height || 200,
          });
        }

        setTimeout(() => {
          if (sizeWasSet) return;

          const toRemove = document.getElementsByClassName("navbar-brand")?.[0];
          toRemove?.remove();
          const nameInput = document.createElement("input");
          nameInput.type = "list";
          nameInput.id = "fileNameInput";
          nameInput.placeholder = "new";
          nameInput.value = currentChick;

          nameInput.setAttribute("list", "fileSuggestions");
          const dataList = document.createElement("datalist");
          dataList.id = "fileSuggestions";
          const sanitizedStoredList = storedFiles.map((text: string) =>
            text.replace(".png", "").replace(".chi", "")
          );
          sanitizedStoredList
            .filter(
              (item: string, index: number) =>
                sanitizedStoredList.indexOf(item) === index
            )
            .forEach((suggestionText: string) => {
              const suggestion = document.createElement("option");
              suggestion.value = suggestionText;

              dataList.appendChild(suggestion);
            });
          nameInput.appendChild(dataList);

          document
            .getElementsByClassName(
              "navbar navbar-expand-md navbar-light bg-light"
            )[0]
            .appendChild(nameInput);
          nameInput.addEventListener("change", (event: any) => {
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
            // save image file (for game engine)
            const flatBlob = new Blob([flat], { type: "image/png" });
            const blobUrl = URL.createObjectURL(flatBlob);
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
            // save chi file too
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
  };

  useEffect(() => {
    // startClucking();
    require("chickenpaint/resources/css/chickenpaint.css");
    //unmount
    return () => {};
  }, []);

  useEffect(() => {
    startClucking();
  }, [currentChick]);

  return (
    <div
      id="chickenpaint-parent"
      className="flex-1"
      key={currentChick}
      onPointerUp={storeUserInterfaceState}
    />
  );
}

export default Paint;
