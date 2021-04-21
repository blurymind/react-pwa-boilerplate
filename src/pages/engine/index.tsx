import React, { useEffect } from "react";
import "@monogatari/core/dist/engine/core/monogatari.css";
import CustomTag from "@components/custom-tag";
import "./main.css";
import { settings, preferences, storage } from "./settings";
import { setScript } from "./script";

const Monogatari = require("@monogatari/core");

// TODO turn into a component
const Engine = () => {
  useEffect(() => {
    const monogatari = Monogatari.default;
    // SETTINGS
    monogatari.settings(settings);
    monogatari.preferences(preferences);
    // Persistent Storage Variable
    monogatari.storage(storage);
    //// Script
    setScript(monogatari);

    /// Main
    const { $_ready, $_ } = Monogatari;
    // 1. Outside the $_ready function:
    $_ready(() => {
      // 2. Inside the $_ready function:
      monogatari.init("#monogatari").then(() => {
        // 3. Inside the init function:
      });
    });
  }, []);

  return (
    <div className="flex flex-1">
      <div id="monogatari">
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
    </div>
  );
};

export default Engine;
