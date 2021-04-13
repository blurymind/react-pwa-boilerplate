import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import DndSheet, { GroupType } from "@components/dnd-sheet";
import {
  initiatePwaButton,
  requestFileAccess,
  getNewFileHandle,
  readFile,
  writeFile,
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
  const editedFileRef = useRef<any>(null);

  useEffect(() => {
    initiatePwaButton("addBtn");
  }, []);

  const onSave = async () => {
    // if file handler is not there, request path,
    // if file handler is there, overwrite file that it is hooked to
    if (!!editedFileRef.current) {
      await editedFileRef.current.write(JSON.stringify(items));
      // Close the file and write the contents to disk.
      await editedFileRef.current.close(); //fails
      console.log("overwrote", editedFileRef.current);
    } else {
      const fileHandle = await getNewFileHandle();
      const writable = await fileHandle.createWritable();
      editedFileRef.current = writable;
      // Write the contents of the file to the stream.
      console.log(writable);
      await writable.write(JSON.stringify(items));
      // Close the file and write the contents to disk.
      await writable.close();
      // writeFile(editedFileRef.current, JSON.stringify(items));
      console.log("made new file", editedFileRef.current);
    }
  };

  const onOpen = () => {
    editedFileRef.current = getNewFileHandle();
    console.log(readFile(editedFileRef.current));
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
        <button
          id="openBtn"
          onClick={onOpen}
          className="bg-red-400 rounded-md p-1 mb-3"
        >
          Open
        </button>
        <button
          id="saveBtn"
          className="bg-red-400 rounded-md p-1 mb-3"
          onClick={onSave}
        >
          Save
        </button>
        <DndSheet items={items} setItems={setItems} className="px-4" />
      </header>
    </div>
  );
};

export default Main;
