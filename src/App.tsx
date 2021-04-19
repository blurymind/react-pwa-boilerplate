import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import NavBar from "@components/nav-bar";
import Main from "@pages/main";
import About from "@pages/about";
import Settings from "@pages/settings";

const App = () => {
  return (
    <>
      <NavBar className="flex justify-between item-center h-16 bg-white text-black relative shadow-sm font-mono" />
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Route
          render={({ location }) => (
            <Switch location={location}>
              <Route path="/" exact component={Main} />
              <Route path="/about" component={About} />
              <Route path="/settings" component={Settings} />
            </Switch>
          )}
        />
      </HashRouter>
    </>
  );
};

export default App;
