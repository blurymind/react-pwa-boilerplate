import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import NavBar from "@components/nav-bar";
import Project from "@pages/project";
import Main from "@pages/main";
import About from "@pages/about";
import Settings from "@pages/settings";

const App = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBar className="flex justify-between item-center h-16 bg-white text-black relative shadow-sm font-mono p-2" />
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Route
          render={({ location }) => (
            <Switch location={location}>
              <Route path="/" exact component={Project} />
              <Route path="/sheet" exact component={Main} />
              <Route path="/about" component={About} />
              <Route path="/settings" component={Settings} />
            </Switch>
          )}
        />
      </HashRouter>
    </div>
  );
};

export default App;
