//https://web.dev/file-system-access/
// https://github.com/GoogleChromeLabs/text-editor/blob/main/src/inline-scripts/fs-helpers.js
// Requests continuous read/write access to a file and returns an object to let you write to the file on demand
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
export const getNewFileHandle = (options = { extension: "txt" }) => {
  const { extension } = options;
  // For Chrome 86 and later...
  if ("showSaveFilePicker" in window) {
    const opts = {
      types: [
        {
          description: "Text file",
          accept: { "text/plain": [`.${extension}`] },
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
        extensions: [extension],
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
