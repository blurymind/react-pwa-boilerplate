import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import DndArea from "./packages/dragable";

const App = () => {
  useEffect(() => {
    // PWA install promotion banner on start
    let deferredPrompt: any = null;
    const addBtn: any = document.getElementById("addBtn");
    window.addEventListener("beforeinstallprompt", (e: any) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      addBtn.style.display = "block";

      addBtn.addEventListener("click", () => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = "none";
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
            addBtn.style.display = "none";
          } else {
            console.log("User dismissed the A2HS prompt");
          }
          deferredPrompt = null;
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
        <button id="addBtn">Add pwa</button>
        <DndArea />
      </header>
    </div>
  );
};

export default App;
