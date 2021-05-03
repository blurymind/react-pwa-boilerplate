import React, { useEffect, useRef } from "react";
import Gist from "react-gist";
import { getLocalStorage } from "@hooks/use-local-storage";
const GitHubApi = require("github-api");
const { Octokit } = require("@octokit/rest");

const Resources = () => {
  const gistId = getLocalStorage("gistId");
  const token = getLocalStorage("gistToken");
  const hostType = getLocalStorage("hostType");
  const userName = getLocalStorage("userName");
  const repositoryName = getLocalStorage("repositoryName");
  const password = getLocalStorage("password");
  const config = {
    username: userName,
    password, // Either your password or an authentication token if two-factor authentication is enabled
    auth: "basic",
    repository: repositoryName, //test-git-api
    branchName: "master",
    token,
  };
  const gitHub = useRef(
    new GitHubApi({
      username: config.username,
      password: config.password,
      token: config.token,
      auth: config.auth,
    })
  );
  const octokit = new Octokit({ auth: token });
  console.log("OCTO", octokit);

  const repository = useRef(null);
  const gist = useRef<any>(null);

  // https://www.liquidweb.com/kb/little-known-ways-to-utilize-github-gists/
  //https://gist.github.com/blurymind/c57d6d3e131848397aaa9f0f996838b7
  //https://github.com/blurymind/git-clone-pwa

  //https://web.dev/read-files/
  const updateGist = async (data: any) => {
    console.log("WRITE TO OCTO", data);
    await octokit
      .request(`PATCH /gists/${gistId}`, {
        gist_id: gistId,
        description: data.commitTitle,
        // accept: "application/vnd.github.v3.base64",
        files: {
          [data.filename]: {
            content: data.content,
          },
        },
      })
      .then((result: any) => {
        console.log("DONE!", result);
        return result;
      });

    console.log(octokit);
  };
  const getGists = async () => {
    // octokit.git.list_commits();
    const tree = await octokit.git.getTree(`/gists/${gistId}`);
    const fetchedGist = await octokit.request(`GET /gists/${gistId}`, {
      gist_id: gistId,
    });
    console.log("octo got", fetchedGist);
    return fetchedGist;
  };
  useEffect(() => {
    getGists().then((result) => {
      console.log("result", result);
    });
    ///// OOLD
    repository.current = gitHub.current.getRepo(
      config.username,
      config.repository
    );
    gist.current = gitHub.current.getGist(gistId);
    // gist.current.__AcceptHeader = "v3+raw";
    console.log("gist::", gist.current, "repository", repository.current);
    //e10b5022dd48df350877dea8fb87b5ee

    gist.current.read().then((gist: any) => {
      console.log(gist.data.files);
    });
  }, []);
  console.log("ID", gistId);
  // todo- add multiple image adding to a gist, all resources in one flat folder,maybe add image prefix
  // https://gist.github.com/blurymind/e10b5022dd48df350877dea8fb87b5ee

  const uploadFiles = (files: any, commitTitle: string) => {
    const readFile = (file: any) => {
      return new Promise(function (resolve, reject) {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", function (event) {
          const content = event.target?.result;
          console.log("file", event, file);
          //@ts-ignore
          const result = content.substr(content.indexOf(",") + 1);

          resolve({
            filename: file.name,
            file: file,
            content: result,
          });
        });

        fileReader.addEventListener("error", function (error) {
          reject(error);
        });

        fileReader.readAsDataURL(file); //asDataUrl
      });
    };
    // Creates an array of Promises resolved when the content
    // of the file provided is read successfully.
    const filesPromises = [].map.call(files, readFile);
    const saveFile = (data: any) => {
      return new Promise((resolve, reject) => {
        // using tests, since their docs are poor https://github.com/github-tools/github/blob/master/test/repository.spec.js
        data.repository.writeFile(
          data.branchName,
          data.filename,
          data.content,
          data.commitTitle,
          { encode: false },
          (err: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(data.repository);
            }
          }
        );
        // data.repository.createBlob(data.content).then((resultBlob: any) => {
        //   console.log("blob?", resultBlob);
        // });
        // Gist try and update
        // gist.current.read().then((fetchedGist: any) => {
        //   console.log(fetchedGist, gist, {
        //     files: {
        //       // ...fetchedGist.data.files,
        //       [data.filename]: { content: data.content },
        //     },
        //   });
        //
        //   gist.current
        //     ?.update({
        //       accept: "application/vnd.github.v3+base64",
        //       type: "image/png",
        //       files: {
        //         // ...fetchedGist.data.files,
        //         [data.filename]: { content: data.content, type: "image/png" },
        //       },
        //     })
        //     .then(() => {
        //       console.log("DONE");
        //       resolve(data.repository);
        //     });
        // });
        // updateGist(data).then((result) => {
        //   resolve(result);
        // });
      });
    };

    return Promise.all(filesPromises).then(function (files) {
      return files.reduce((promise: any, file: any) => {
        return promise.then(function () {
          // Upload the file on GitHub
          return saveFile({
            repository: repository.current,
            branchName: config.branchName,
            filename: file.filename,
            content: file.content,
            commitTitle: commitTitle,
          });
        });
      }, Promise.resolve());
    });
  };

  const onUploadFile = (event: any) => {
    uploadFiles(event.target.files, `upload: ${event.target.files[0].name}`)
      .then(function () {
        alert("Your file has been saved correctly.");
      })
      .catch(function (err: any) {
        console.error(err);
        alert("Something went wrong. Please, try again.");
      });
  };

  // if (hostType !== "gist") return null;
  // if (!gistId || !token) return <div>No Gist configured</div>;
  return (
    <div className="overflow-auto">
      <input type="file" multiple onChange={onUploadFile} />
      <div>
        <Gist id={gistId} />
      </div>
    </div>
  );
};

export default Resources;
