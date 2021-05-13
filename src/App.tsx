import React, { useState } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import NavBar from "@components/nav-bar";
import Project from "@pages/project";
import Main from "@pages/main";
import About from "@pages/about";
import Settings from "@pages/settings";
import Engine from "@pages/engine";
import Resources from "@pages/resources";
import Paint from "@pages/paint";
import useLocalStorage, { getLocalStorage } from "@hooks/use-local-storage";

const App = () => {
  const [projectInfo, setProjectInfo] = useState({
    fileName: getLocalStorage("fileName"),
    hasChanges: getLocalStorage("hasChanges"),
    hostType: getLocalStorage("hostType"),
  });
  const [blobs, setBlobs] = useLocalStorage("blobs", { scenes: [] });
  const { fileName, hasChanges, hostType } = projectInfo;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBar className="flex justify-between item-center h-13 bg-white text-black relative shadow-sm font-mono" />
      <div className="flex justify-between item-center bg-gray-800 pl-2 text-white text-xs">
        {fileName}-{hostType ? hostType : ""}
        {hasChanges ? "*" : ""}
      </div>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Route
          render={({ location }) => (
            <Switch location={location}>
              <Route
                path="/"
                exact
                render={(props) => (
                  <Project
                    {...props}
                    onChange={(changed) => setProjectInfo(changed)}
                  />
                )}
              />
              <Route
                path="/sheet"
                exact
                // component={Main}
                render={(props) => (
                  <Main
                    {...props}
                    onChange={(changed) =>
                      setProjectInfo((prev) => ({ ...prev, ...changed }))
                    }
                  />
                )}
              />
              {/*<Prompt message="Are you sure you want to leave?" />*/}
              <Route
                path="/engine"
                render={(props) => <Engine {...props} blobs={blobs} />}
              />
              <Route path="/settings" component={Settings} />
              <Route path="/paint" component={Paint} />
              <Route
                path="/resources"
                render={(props) => (
                  <Resources {...props} blobs={blobs} setBlobs={setBlobs} />
                )}
              />
              <Route path="/about" component={About} />
            </Switch>
          )}
        />
      </HashRouter>
    </div>
  );
};

export default App;
