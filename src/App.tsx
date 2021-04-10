import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import NavBar from "@components/nav-bar";
import Main from "@pages/main";
import About from "@pages/about";

import "./App.css";

const App = () => {
  return (
    <>
      <NavBar />
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Route
          render={({ location }) => (
            <Switch location={location}>
              <Route path="/" exact component={Main} />
              <Route path="/about" component={About} />
            </Switch>
          )}
        />
      </HashRouter>
    </>
  );
};

export default App;
