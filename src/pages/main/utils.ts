import React from "react";

export const initiatePwaButton = (buttonId = "addBtn") => {
  // PWA install promotion banner on start
  let deferredPrompt: any = null;
  const addBtn: any = document.getElementById(buttonId);
  window.addEventListener("beforeinstallprompt", (e: any) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = "block";

    addBtn.addEventListener("click", () => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = "none";
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
          addBtn.style.display = "none";
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    });

    if (window.matchMedia("(display-mode: fullscreen)").matches) {
      addBtn.style.display = "none";
    }
  });
};

// https://github.com/GoogleChromeLabs/text-editor/blob/main/src/inline-scripts/fs-helpers.js
// Requests continuous read/write access to a file and returns an object to let you write to the file on demand
export const requestFileAccess = (buttonId = "saveBtn") => {
  const butOpenFile: any = document.getElementById(buttonId);

  let fileHandle;
  // https://web.dev/file-system-access/
  butOpenFile.addEventListener("click", async () => {
    // Destructure the one-element array.
    // @ts-ignore
    [fileHandle] = await window.showOpenFilePicker();
    // Do something with the file handle.
  });

  async function getNewFileHandle() {
    const options = {
      types: [
        {
          description: "Text Files",
          accept: {
            "text/plain": [".txt"],
          },
        },
      ],
    };
    //@ts-ignore
    const handle = await window.showSaveFilePicker(options);
    return handle;
  }
};

/**
 * Writes the contents to disk.
 *
 * @param {FileSystemFileHandle} fileHandle File handle to write to.
 * @param {string} contents Contents to write.
 */
export const writeFile = async (fileHandle: any, contents: string) => {
  // Support for Chrome 82 and earlier.
  if (fileHandle.createWriter) {
    // Create a writer (request permission if necessary).
    const writer = await fileHandle.createWriter();
    // Write the full length of the contents
    await writer.write(0, contents);
    // Close the file and write the contents to disk
    await writer.close();
    return;
  }
  console.log(fileHandle);
  // For Chrome 83 and later.
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
};

/**
 * Open a handle to an existing file on the local file system.
 *
 * @return {!Promise<FileSystemFileHandle>} Handle to the existing file.
 */
export const getFileHandle = () => {
  // For Chrome 86 and later...
  if ("showOpenFilePicker" in window) {
    //@ts-ignore
    return window.showOpenFilePicker().then((handles: any) => handles[0]);
  }
  // For Chrome 85 and earlier...
  //@ts-ignore
  return window.chooseFileSystemEntries();
};

/**
 * Create a handle to a new (text) file on the local file system.
 * @return {!Promise<FileSystemFileHandle>} Handle to the new file.
 */
export const getNewFileHandle = () => {
  // For Chrome 86 and later...
  if ("showSaveFilePicker" in window) {
    const opts = {
      types: [
        {
          description: "Text file",
          accept: { "text/plain": [".txt"] },
        },
      ],
    };
    //@ts-ignore
    return window.showSaveFilePicker(opts);
  }
  // For Chrome 85 and earlier...
  const opts = {
    type: "save-file",
    accepts: [
      {
        description: "Text file",
        extensions: ["txt"],
        mimeTypes: ["text/plain"],
      },
    ],
  };
  //@ts-ignore
  return window.chooseFileSystemEntries(opts);
};

/**
 * Reads the raw text from a file.
 *
 * @private
 * @param {File} file
 * @return {Promise<string>} A promise that resolves to the parsed string.
 */
const _readFileLegacy = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", (e) => {
      //@ts-ignore
      const text = e.srcElement?.result;
      resolve(text);
    });
    reader.readAsText(file);
  });
};

/**
 * Reads the raw text from a file.
 *
 * @param {File} file
 * @return {!Promise<string>} A promise that resolves to the parsed string.
 */
export const readFile = (file: any) => {
  // If the new .text() reader is available, use it.
  if (file.text) {
    return file.text();
  }
  // Otherwise use the traditional file reading technique.
  return _readFileLegacy(file);
};

/**
 * Verify the user has granted permission to read or write to the file, if
 * permission hasn't been granted, request permission.
 *
 * @param {FileSystemFileHandle} fileHandle File handle to check.
 * @param {boolean} withWrite True if write permission should be checked.
 * @return {boolean} True if the user has granted read/write permission.
 */
export const verifyPermission = async (fileHandle: any, withWrite: boolean) => {
  const opts = { writable: false, mode: "" };
  if (withWrite) {
    opts.writable = true;
    // For Chrome 86 and later...
    opts.mode = "readwrite";
  }
  // Check if we already have permission, if so, return true.
  if ((await fileHandle.queryPermission(opts)) === "granted") {
    return true;
  }
  // Request permission to the file, if the user grants permission, return true.
  if ((await fileHandle.requestPermission(opts)) === "granted") {
    return true;
  }
  // The user did nt grant permission, return false.
  return false;
};
