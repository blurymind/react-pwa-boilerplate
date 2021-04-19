import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import DndSheet, { GroupType } from "@components/dnd-sheet";
import useLocalStorage, { getLocalStorage } from "@hooks/use-local-storage";
import { openGist, TryOpenGist, trySaveGist } from "@helpers/gist";
import {
  initiatePwaButton,
  getNewFileHandle,
  readFile,
  writeFile,
  getFileHandle,
} from "@helpers/local-fs";

import "../../App.css";

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

//https://web.dev/file-system-access/
const Main = () => {
  const [items, setItems] = useLocalStorage("dnd-sheet-data", DATA);
  const [hasChanges, setHasChanges] = useState(false);
  const editedFileRef = useRef<any>(null);

  useEffect(() => {
    initiatePwaButton("addBtn");
  }, []);

  useEffect(() => {
    if (editedFileRef.current) setHasChanges(true);
  }, [items, editedFileRef.current]);

  const onSave = async () => {
    const gistId = getLocalStorage("gistId");
    const token = getLocalStorage("gistToken");
    trySaveGist(
      gistId,
      token,
      editedFileRef.current.name,
      JSON.stringify(items)
    );
    setHasChanges(false);

    // from hd - not working on mobile yet boo
    // if (!editedFileRef.current) {
    //   //ask about saving a new file
    //   editedFileRef.current = await getNewFileHandle({ extension: "json" });
    //   console.log("new file", editedFileRef.current?.name);
    // }
    // writeFile(editedFileRef.current, JSON.stringify(items));
    // console.log("wrote to", editedFileRef.current);
    // setHasChanges(false);
  };

  const onNew = () => {
    editedFileRef.current = null;
    onSave();
  };

  const onOpen = async () => {
    const gistId = getLocalStorage("gistId");
    const token = getLocalStorage("gistToken");
    // from gist
    TryOpenGist(gistId, token, ({ content, fileName }: any) => {
      console.log("Got this:", content);
      setItems(JSON.parse(content));
      editedFileRef.current = { name: fileName };
      setHasChanges(false);
    });

    // From local hd - not working on mobile yet- boo
    // editedFileRef.current = await getFileHandle();
    // const file = await editedFileRef.current.getFile();
    // const fileContents = await readFile(file);
    // console.log("opened file", fileContents);
    // setItems(JSON.parse(fileContents));
    // setHasChanges(false);
  };

  return (
    <div className="bg-gray-700 flex flex-1 flex-col">
      <header className="flex-1 py-2 flex flex-row">
        <img src={logo} className="animate-spin h-8" alt="logo" />
        <br />
        <button id="addBtn" className="bg-blue-400 rounded-md p-1 mb-3">
          Install pwa
        </button>
        <div className="flex-box flex-wrap flex-1">
          <button
            onClick={onOpen}
            className="bg-red-400 rounded-md p-1 mb-3 mx-1"
          >
            Open
          </button>
          <button
            className="bg-red-400 rounded-md p-1 mb-3 mx-1"
            onClick={onSave}
          >
            Save {editedFileRef.current?.name} {hasChanges ? "*" : ""}
          </button>
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
      <DndSheet items={items} setItems={setItems} className="px-4" />
    </div>
  );
};

export default Main;
