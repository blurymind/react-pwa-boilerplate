import React, { useEffect, useRef, useState } from "react";
import useLocalStorage, { getLocalStorage } from "@hooks/use-local-storage";
import { TryOpenGist, trySaveGist, trySaveAsGist } from "@helpers/gist";
import logo from "@pages/main/logo.svg";
import {
  initiatePwaButton,
  getNewFileHandle,
  readFile,
  writeFile,
  getFileHandle,
} from "@helpers/local-fs";

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

const Project = () => {
  const gistId = getLocalStorage("gistId");
  const token = getLocalStorage("gistToken");
  const [items, setItems] = useLocalStorage("dnd-sheet-data", DATA);
  const [hasChanges, setHasChanges] = useLocalStorage("hasChanges", false);
  const [fileName, setFileName] = useLocalStorage("fileName", "new*");
  const [hostType, setHostType] = useLocalStorage("hostType", null); //null | "gist" | "fs"
  const editedFileRef = useRef<any>(null);

  useEffect(() => {
    initiatePwaButton("addBtn");
  }, []);
  useEffect(() => {
    if (editedFileRef.current) setHasChanges(true);
  }, [items, editedFileRef.current]);

  const onSaveAsGist = () => {
    trySaveAsGist({
      gistId,
      token,
      fileName,
      setFileName,
      data: JSON.stringify(items),
    });
    // trySaveGist();
    setHasChanges(false);
    setHostType("gist");
  };

  // todo: implement save as + guess type being used
  const onSave = async () => {
    if (hostType === "gist") {
      onSaveAsGist();
      // const gistId = getLocalStorage("gistId");
      // const token = getLocalStorage("gistToken");
      // trySaveGist(gistId, token, fileName, JSON.stringify(items));
      // setHasChanges(false);
      // setHostType("gist");
    } else {
      // from hd - not working on mobile yet boo
      if (!editedFileRef.current) {
        //ask about saving a new file
        editedFileRef.current = await getNewFileHandle({ extension: "json" });
        console.log("new file", editedFileRef.current?.name);
      }
      writeFile(editedFileRef.current, JSON.stringify(items));
      console.log("wrote to", editedFileRef.current);
      setHasChanges(false);
    }
  };

  const onNew = () => {
    editedFileRef.current = null;
    // onSave();
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

  const onOpen = async () => {
    // From local hd - not working on mobile yet- boo
    editedFileRef.current = await getFileHandle();
    const file = await editedFileRef.current.getFile();
    const fileContents = await readFile(file);
    console.log("opened file", fileContents);
    setItems(JSON.parse(fileContents));
    setHasChanges(false);
    setHostType("fs");
  };

  return (
    <div>
      <header className="py-2 flex flex-row">
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
            onClick={onOpen}
            className="bg-red-400 rounded-md p-1 mb-3 mx-1"
          >
            Open local
          </button>
          {hostType && (
            <button
              className="bg-red-400 rounded-md p-1 mb-3 mx-1"
              onClick={onSave}
            >
              Save {fileName} {hasChanges ? "*" : ""} {hostType ? hostType : ""}
            </button>
          )}

          {editedFileRef.current && (
            <button
              onClick={onNew}
              className="bg-red-400 rounded-md p-1 mb-3 mx-1"
            >
              New
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Project;
