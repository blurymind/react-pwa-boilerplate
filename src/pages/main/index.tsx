import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import DndSheet, { GroupType } from "@components/dnd-sheet";
import {
  initiatePwaButton,
  getNewFileHandle,
  readFile,
  writeFile,
  getFileHandle,
} from "./utils";

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
  const [items, setItems] = useState<Array<GroupType>>(DATA);
  const [hasChanges, setHasChanges] = useState(false);
  const editedFileRef = useRef<any>(null);

  useEffect(() => {
    initiatePwaButton("addBtn");
  }, []);

  useEffect(() => {
    if (editedFileRef.current) setHasChanges(true);
  }, [items, editedFileRef.current]);

  const onSave = async () => {
    if (!editedFileRef.current) {
      //ask about saving a new file
      editedFileRef.current = await getNewFileHandle({ extension: "json" });
      console.log("new file", editedFileRef.current?.name);
    }
    writeFile(editedFileRef.current, JSON.stringify(items));
    console.log("wrote to", editedFileRef.current);
    setHasChanges(false);
  };

  const onNew = () => {
    editedFileRef.current = null;
    onSave();
  };

  const onOpen = async () => {
    editedFileRef.current = await getFileHandle();
    const file = await editedFileRef.current.getFile();
    const fileContents = await readFile(file);
    console.log("opened file", fileContents);
    setItems(JSON.parse(fileContents));
    setHasChanges(false);
  };

  return (
    <div className="Demo App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-red-500">
          Edit <code>src/App.tsx</code> and save to reload. This demos a project
          structure with file system access
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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

        <DndSheet items={items} setItems={setItems} className="px-4" />
      </header>
    </div>
  );
};

export default Main;
