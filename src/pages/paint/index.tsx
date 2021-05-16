import React, { useEffect, useState } from "react";
import "chickenpaint/resources/css/chickenpaint.css";

const ChickenPaint = require("chickenpaint");

export function Paint() {
  useEffect(() => {
    // document.addEventListener("DOMContentLoaded", function (event: any) {
    //   console.log("LOAD", ChickenPaint);
    //   new ChickenPaint({
    //     uiElem: document.getElementById("chickenpaint-parent"),
    //     // saveUrl: "save.php",
    //     // postUrl: "complete.php",
    //     // exitUrl: "index.php",
    //     // resourcesRoot: "chickenpaint/",
    //   });
    // });
    setTimeout(() => {
      new ChickenPaint({
        uiElem: document.getElementById("chickenpaint-parent"),
        // saveUrl: "save.php",
        // postUrl: "complete.php",
        // exitUrl: "index.php",
        // resourcesRoot: "chickenpaint/",
      });
    }, 100);
  }, []);
  return <div id="chickenpaint-parent" className="flex-1" />;
}

export default Paint;
