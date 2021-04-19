import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getLocalStorage } from "@hooks/use-local-storage";

const Gists = require("gists");

export const openGist = () => {
  const MySwal = withReactContent(Swal);

  MySwal.fire({
    title: <p>Hello World</p>,
    footer: "Copyright 2018",
    didOpen: () => {
      // `MySwal` is a subclass of `Swal`
      //   with all the same instance & static methods
      MySwal.clickConfirm();
    },
  }).then(() => {
    return MySwal.fire(<p>Shorthand works too</p>);
  });
};

export const TryOpenGist = async (
  gistId: string,
  token: string,
  cb: (a: { content?: string; fileName?: string }) => void
) => {
  const MySwal = withReactContent(Swal);
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
    Swal.fire(
      "Not configured",
      "Your github settings are not configured",
      "warning"
    );
    cb({});
  }
};

export const trySaveGist = async (
  gistId: string,
  token: string,
  fileName = "new",
  data: string
) => {
  const gists = new Gists({ token });

  if (gistId && token && gists) {
    gists.get(gistId).then((gist: any) => {
      const gistFiles = Object.keys(gist.body.files);
      console.log(gistFiles);
      gists.edit(gistId, {
        files: { [fileName]: { content: data } },
      });
      Swal.fire(
        "Saved!",
        `The Yarn has been saved to gist ${gistId}`,
        "success"
      );
    });
  } else {
    Swal.fire(
      "Not configured",
      "Your github settings are not configured",
      "warning"
    );
  }
};
