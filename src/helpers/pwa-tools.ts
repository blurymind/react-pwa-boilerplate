export const initiatePwaButton = (buttonId = "addBtn") => {
  // PWA install promotion banner on start
  let deferredPrompt: any = null;
  const addBtn: any = document.getElementById(buttonId);
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

    if (window.matchMedia("(display-mode: fullscreen)").matches) {
      addBtn.style.display = "none";
    }
  });
};
