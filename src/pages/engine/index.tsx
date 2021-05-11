import React, { useEffect } from "react";
import "@monogatari/core/dist/engine/core/monogatari.css";
import CustomTag from "@components/custom-tag";
import "./main.css";
import { settings, preferences, storage } from "./settings";
import { setScript } from "./script";
import { getLocalStorage } from "@hooks/use-local-storage";

const Monogatari = require("@monogatari/core");
const { $_ready, $_, default: monogatari } = Monogatari;

// TODO turn into a component
const Engine = () => {
  const blobs = getLocalStorage("blobs");
  useEffect(() => {
    // SETTINGS
    monogatari.settings(settings);
    monogatari.preferences(preferences);
    // Persistent Storage Variable
    monogatari.storage(storage);
    //// Script
    setScript(monogatari, blobs);

    /// Main

    // 1. Outside the $_ready function:
    // $_ready(() => {
    // 2. Inside the $_ready function:
    monogatari.init("#monogatari").then(() => {
      console.log(monogatari.history());
      console.log(monogatari.state());
      console.log(monogatari.assets());

      // 3. Inside the init function:
    });

    // });

    return () => {
      // Workaround for monogatari not clearing some state from memory and failing to load next time
      console.log("unmount", monogatari.Storage.configuration().name);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    };
  });

  return (
    <div id="monogatari" className="flex flex-1">
      <CustomTag as="visual-novel">
        <CustomTag as="language-selection-screen" />
        <CustomTag as="loading-screen" />
        <CustomTag as="main-screen">
          <CustomTag as="main-menu" />
        </CustomTag>
        <CustomTag as="game-screen">
          <CustomTag as="dialog-log" />
          <CustomTag as="text-box" />
          <CustomTag as="quick-menu" />
        </CustomTag>
        <CustomTag as="gallery-screen" />
        <CustomTag as="credits-screen" />
        <CustomTag as="load-screen" />
        <CustomTag as="save-screen" />
        <CustomTag as="settings-screen" />
        <CustomTag as="help-screen" />
      </CustomTag>
    </div>
  );
};

export default Engine;
