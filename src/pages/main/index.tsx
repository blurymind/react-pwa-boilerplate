import React from "react";
import DndSheet, { GroupType } from "@components/dnd-sheet";
import useLocalStorage from "@hooks/use-local-storage";

import "../../App.css";

const DATA = [
  //
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

  return (
    <div className="bg-gray-700 flex flex-1 flex-col overflow-auto">
      <DndSheet items={items} setItems={setItems} className="px-4" />
      ==
    </div>
  );
};

export default Main;
