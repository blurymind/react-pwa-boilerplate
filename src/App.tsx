import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import DndArea from "./packages/dragable";

const mockCards = [
  {
    id: 1,
    children: "Write a cool JS library",
  },
  {
    id: 2,
    tooltip: "Make it generic enough",
    children: <button onClick={() => alert("yay")}>Test</button>,
  },
  {
    id: 3,
    children: "Write README",
  },
  {
    id: 4,
    children: "Create some examples",
  },
  {
    id: 5,
    tooltip:
      "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
  },
  {
    id: 6,
    children: "???",
  },
  {
    id: 7,
    children: "PROFIT",
  },
];

const App = () => {
  const [cards, setCards] = useState(mockCards);

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
        <DndArea cards={cards} setCards={setCards} />
      </header>
    </div>
  );
};

export default App;
