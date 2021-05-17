import React, { useEffect, useRef } from "react";
import useLocalStorage, { getLocalStorage } from "@hooks/use-local-storage";
import {
  TryOpenGist,
  trySaveAsGist,
  openGistByName,
  trySaveGist,
} from "@helpers/gist";
import logo from "@images/logo.svg";
import {
  getNewFileHandle,
  readFile,
  writeFile,
  getFileHandle,
} from "@helpers/local-fs";
import { initiatePwaButton } from "@helpers/pwa-tools";
import { getAllCacheBlobs } from "@helpers/cache";
import { ensureRepo } from "./git";
const { Octokit } = require("@octokit/rest");
const { Base64 } = require("js-base64");
const GitHubApi = require("github-api");

const DATA = [
  {
    id: "af3",
    label: "Incoming leads",
    items: [
      {
        id: "af31",
        label: "Item 3.1 - Auguri",
        className: "bg-red-500 hover:bg-red-700 rounded-md mb-1 mx-1",
      },
      {
        id: "af32",
        label:
          "Item 3.2 - Sed tellus risus, tincidunt ac fringilla sed, rho vel elit. Fusce et mauris lobortis",
      },
      {
        id: "af33",
        label:
          "Item 3.3 - Praesent nec massa vel ante porta elementum. Nulla urna risus, ullamcorper a nibh sodales, laoreet ullamcorper arcu. Nulla vel ante neque. Ut nunc tortor",
      },
      { id: "af34", label: "Item 3.4 - Aliquam hendrerit quis nibh" },
    ],
    tint: 1,
  },
  {
    id: "af1",
    label: "Closing leads",
    items: [
      { id: "af11", label: "Item 1.1 - Sed sit amet ornare nisi." },
      {
        id: "af12",
        label:
          "Item 1.2 - Donec aliquet commodo justo, in faucibus libero efficitur ut. Nam ut lacus in dui sollicitudin sollicitudin.",
      },
    ],
    tint: 2,
  },
  {
    id: "af2",
    label: "On hold",
    items: [
      { id: "af21", label: "Item 2.1 - Vivamus eget ante tempor" },
      { id: "af22", label: "Item 2.2 - Pellentesque euismod" },
    ],
    tint: 3,
  },
];

export interface Props {
  onChange: (a: any) => void;
}

const Project = ({ onChange = () => {} }: Props) => {
  const gistId = getLocalStorage("gistId");
  const token = getLocalStorage("gistToken");
  const userName = getLocalStorage("userName");
  const repo = getLocalStorage("repositoryName");
  const [items, setItems] = useLocalStorage("dnd-sheet-data", DATA);
  const [hasChanges, setHasChanges] = useLocalStorage("hasChanges", false);
  const [fileName, setFileName] = useLocalStorage("fileName", "NewFile");
  const [hostType, setHostType] = useLocalStorage("hostType", null); //null | "gist" | "fs"
  const [recentFiles, setRecentFiles] = useLocalStorage("recentFiles", []);
  const editedFileRef = useRef<any>(null);
  const octokit = new Octokit({ auth: token });
  const gitHub = useRef(
    new GitHubApi({
      username: userName,
      token: token,
    })
  );
  console.log("GITHUB", gitHub);

  const addCacheToGist = async () => {
    getAllCacheBlobs(async (cache: any) => {
      const saveFile = (data: any, encode = false) => {
        return new Promise((resolve, reject) => {
          // using tests, since their docs are poor https://github.com/github-tools/github/blob/master/test/repository.spec.js
          data.repository.writeFile(
            data.branchName,
            data.filename,
            data.content,
            data.commitTitle,
            { encode },
            (err: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(data.repository);
              }
            }
          );
        });
      };
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

          fileReader.readAsDataURL(file.content); //asDataUrl
        });
      };
      const filesPromises = [].map.call(Object.values(cache), readFile);
      const gitRepo = gitHub.current?.getRepo(userName, repo);
      return Promise.all(filesPromises)
        .then(function (files) {
          return files.reduce((promise: any, file: any) => {
            return promise.then(function () {
              console.log("FLINE>", file);
              // Upload the file on GitHub
              return saveFile({
                repository: gitRepo,
                branchName: "master",
                filename: file.filename,
                content: file.content,
                commitTitle: "add file " + file.filename,
              });
            });
          }, Promise.resolve());
        })
        .then(() => {
          console.log("SAVE PROJECT");
          saveFile(
            {
              repository: gitRepo,
              branchName: "master",
              filename: "project.json",
              content: JSON.stringify(items),
              commitTitle: "add project file",
            },
            true
          );
        })
        .then(() => {
          alert("DONE!");
        });
    }, true);
  };

  console.log("CRED:", userName, repo, token);
  const getGists = async () => {
    // octokit.git.list_commits();
    const fetchedGist = await octokit.request(`GET /gists/${gistId}`, {
      gist_id: gistId,
    });
    console.log("octo got", fetchedGist);
    return fetchedGist;
  };

  useEffect(() => {
    getGists().then((result) => {
      console.log("Octo got gists files:", result.data.files);
    });

    if (hostType) initiatePwaButton("addBtn");
  }, []);

  const onSaveToFs = async () => {
    if (!editedFileRef.current) {
      //ask about saving a new file
      editedFileRef.current = await getNewFileHandle({ extension: "json" });
      console.log("new file", editedFileRef.current?.name);
    }
    writeFile(editedFileRef.current, JSON.stringify(items));
    console.log("wrote to", editedFileRef.current);
    setHasChanges(false);
  };

  const onSaveAsGist = () => {
    trySaveAsGist({
      gistId,
      token,
      fileName,
      setFileName,
      data: JSON.stringify(items),
    });
    setHostType("gist");
    setHasChanges(false);
  };

  const onSave = async () => {
    if (hostType === "gist") {
      // trySaveGist(gistId, token, fileName, JSON.stringify(items));
      // setHostType("gist");
      // setHasChanges(false);
      // onChange({
      //   fileName,
      //   hasChanges: false,
      //   hostType,
      // });
      addCacheToGist();
    } else {
      // from hd - not working on mobile yet boo
      onSaveToFs();
    }
  };

  const onOpenGist = async () => {
    const gistId = getLocalStorage("gistId");
    const token = getLocalStorage("gistToken");
    // from gist
    TryOpenGist(gistId, token, ({ content, fileName }: any) => {
      console.log("Got this:", content);
      setItems(JSON.parse(content));
      editedFileRef.current = { name: fileName };
      setFileName(fileName);
      setHasChanges(false);
    });
    setHostType("gist");
  };

  const onOpenLocal = async () => {
    // From local hd - not working on mobile yet- boo
    editedFileRef.current = await getFileHandle();
    const file = await editedFileRef.current.getFile();
    const fileContents = await readFile(file);
    console.log("opened file", fileContents);
    setItems(JSON.parse(fileContents));
    setHasChanges(false);
    setHostType("fs");
  };

  useEffect(() => {
    if (!hostType) return;
    if (
      recentFiles &&
      !recentFiles.find(
        (file: any) => file.fileName === fileName && file.hostType === hostType
      )
    )
      setRecentFiles([...recentFiles, { fileName, hostType }]);
  }, [items, hostType, fileName]);

  const onOpen = (openedFileName: string, fileHostType: string) => {
    if (openedFileName === fileName && hostType === fileHostType) return;

    if (fileHostType === "gist") {
      openGistByName(gistId, token, openedFileName, (fileContents: string) => {
        setItems(JSON.parse(fileContents));
        setFileName(openedFileName);
        setHasChanges(false);
        setHostType(fileHostType);
        onChange({
          fileName: openedFileName,
          hasChanges: false,
          hostType: fileHostType,
        });
      });
    } else {
      //Todo add fs
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-auto bg-gray-600">
      <header className="pt-2 flex flex-row">
        <img src={logo} className="animate-spin h-8" alt="logo" />
        <br />
        <button id="addBtn" className="bg-blue-400 rounded-md p-1 mb-3">
          Install pwa
        </button>
        <div className="flex-box flex-wrap flex-1">
          {gistId && token && (
            <>
              <button
                onClick={onOpenGist}
                className="bg-red-400 rounded-md p-1 mb-3 mx-1"
              >
                Open gist
              </button>
              <button
                className="bg-red-400 rounded-md p-1 mb-3 mx-1"
                onClick={onSaveAsGist}
              >
                Save as Gist
              </button>
            </>
          )}

          <button
            onClick={onOpenLocal}
            className="bg-green-400 rounded-md p-1 mb-3 mx-1"
          >
            Open local
          </button>
          <button
            className="bg-green-400 rounded-md p-1 mb-3 mx-1"
            onClick={onSaveToFs}
          >
            Save as Local
          </button>
          {hostType && (
            <>
              <button
                className="bg-yellow-400 rounded-md p-1 mb-3 mx-1"
                onClick={onSave}
              >
                Save {fileName} {hasChanges ? "*" : ""}{" "}
                {hostType ? hostType : ""}
              </button>
            </>
          )}
        </div>
      </header>
      <div className="px-2 pb-2 flex flex-1 flex-col overflow-hidden">
        <div className="p-2 bg-gray-400">Open recent:</div>
        <div className="flex flex-1 flex-col overflow-auto">
          {recentFiles.map((file: any, index: number) => (
            <div
              className={`p-2 bg-gray-${
                index % 2 ? 200 : 300
              } hover:bg-gray-100`}
              key={`recentFile-${file.fileName}-${file.hostType}`}
              onClick={() => onOpen(file.fileName, file.hostType)}
            >
              {file.fileName} @ {file.hostType}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
