import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const Gists = require("gists");

export { MySwal as Swal };
const noGistsSet = () => {
  Swal.fire(
    "Not configured",
    "Your github settings are not configured",
    "warning"
  );
};

export const openGistByName = (
  gistId: string,
  token: string,
  fileName: string,
  cb: (a: string) => void
) => {
  const gists = new Gists({ token });
  if (gists && token && gistId) {
    gists.get(gistId).then((gist: any) => {
      const gistFiles = gist.body.files;
      const content = gistFiles[fileName].content;
      cb(content);
      Swal.fire(
        "Opened",
        `The Yarn has been loaded from gist \nName: ${fileName}\nAt: ${gistId}\nLength: ${content.length} chars`,
        "success"
      );
    });
  } else noGistsSet();
};

export const TryOpenGist = async (
  gistId: string,
  token: string,
  cb: (a: { content?: string; fileName?: string }) => void
) => {
  const gists = new Gists({ token });
  console.log("Gist", gists, token);

  if (gists && token && gistId) {
    gists.get(gistId).then((gist: any) => {
      const gistFiles = gist.body.files;
      const inputOptions: any = {};
      Object.keys(gistFiles).forEach((key) => {
        inputOptions[key] = key;
      });
      console.log("GIST FILES", gistFiles);
      MySwal.fire({
        title: "🐙 Open file from a gist",
        input: "select",
        inputOptions,
        inputAttributes: {
          autocomplete: "off",
        },
        inputPlaceholder: "Select a file from the gist",
        showCancelButton: true,
      }).then(({ value }) => {
        if (value) {
          const content = gistFiles[value].content;
          const fileName = gistFiles[value].filename;
          console.log(gistFiles[value]);
          cb({ content, fileName });
        }
      });
    });
  } else {
    noGistsSet();
    cb({});
  }
};

export const trySaveGist = async (
  gistId: string,
  token: string,
  fileName = "NewFile",
  data: any
) => {
  const gists = new Gists({ token });

  if (gistId && token && gists) {
    gists.get(gistId).then((gist: any) => {
      const gistFiles = Object.keys(gist.body.files);
      console.log(gistFiles);
      gists.edit(gistId, {
        files: {
          [fileName]: {
            content: data,
            headers: {
              contentType: "image/png",
              "content-type": "image/png",
            },
          },
        },
      });
      Swal.fire(
        "Saved!",
        `The Yarn has been saved to gist \nName: ${fileName}\nAt: ${gistId}\nLength: ${data.length} chars`,
        "success"
      );
    });
  } else {
    noGistsSet();
  }
};

export const trySaveAsGist = ({
  fileName = "NewFile",
  setFileName,
  gistId,
  token,
  data,
}: {
  fileName: string;
  setFileName: (a: string) => void;
  gistId: string;
  token: string;
  data: any;
}) => {
  const gists = new Gists({ token });

  if (gistId && token && gists) {
    gists.get(gistId).then((gist: any) => {
      const gistFiles = Object.keys(gist.body.files);

      MySwal.fire({
        title: "💾 Save file - enter file name",
        html: `<input id="swal-input1" list="select-file-name" name="select" placeholder="${fileName}">
      <datalist class="form-control" id="select-file-name">    
        ${
          gistFiles &&
          gistFiles
            .map((suggestion) => `<option value="${suggestion}" />`)
            .join("")
        }
      </datalist>`,
        onOpen: () => {
          if (
            fileName !== "NewFile" &&
            document.getElementById("swal-input1")
          ) {
            //@ts-ignore
            document.getElementById("swal-input1").value = fileName;
          }
        },
        showCancelButton: true,
        //@ts-ignore
        preConfirm: () => document.getElementById("swal-input1")?.value,
      }).then(({ value }) => {
        if (value && value !== "") {
          trySaveGist(gistId, token, value, data);
          setFileName(value);
        }
      });
    });
  } else {
    noGistsSet();
  }
};
