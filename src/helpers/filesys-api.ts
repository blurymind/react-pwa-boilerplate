export const initiateFsPath = (virtualDirectory = "") => {
  //urls at filesystem:http://localhost:3000/persistent/base/
  //https://www.jotform.com/blog/html5-filesystem-api-create-files-store-locally-using-javascript-webkit/
  // https://developers.google.com/web/updates/2011/08/Debugging-the-Filesystem-API
  //https://www.arcusglobal.com/news/file-system-how-to
  //@ts-ignore
  var requestedBytes = 1024 * 1024 * 10; // 10MB
  //@ts-ignore
  window.requestFileSystem =
    //@ts-ignore
    window.requestFileSystem || window.webkitRequestFileSystem;
  //@ts-ignore
  navigator.webkitPersistentStorage.requestQuota(
    requestedBytes,
    function (grantedBytes: any) {
      //@ts-ignore
      window.requestFileSystem(
        //@ts-ignore
        window.PERSISTENT,
        requestedBytes,
        function (fs: any) {
          //@ts-ignore
          window.gFileSystem = fs;
          fs.root.getDirectory(
            `base/${virtualDirectory}`,
            {
              create: true,
            },
            function (dir: any) {
              console.log("dir created", dir);
            },
            function (err: any) {
              console.error(err);
            }
          );
        },
        function (err: any) {
          console.error(err);
        }
      );
    },
    function (err: any) {
      console.error(err);
    }
  );
};

export const uploadToFs = (inputFile: any, baseFolder: string) => {
  //@ts-ignore
  window.gFileSystem.root.getFile(
    `${baseFolder}/${inputFile.name}`,
    {
      create: true,
    },
    (file: any) => {
      console.log("Created File", file);
      console.log("Got File", file);
      file.createWriter(
        function (fileWriter: any) {
          fileWriter.onwriteend = (progress: any) => {
            console.log("Write completed", progress);
          };
          fileWriter.onerror = (err: any) => {
            console.error("Write failed", err);
          };
          fileWriter.write(inputFile);
        },
        (err: any) => {
          console.error("Error creating writer", err);
        }
      );
    },
    console.error
  );
};
