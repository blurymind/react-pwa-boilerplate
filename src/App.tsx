import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "@components/nav-bar";
import Main from "@pages/main";
import About from "@pages/about";

import "./App.css";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/about" component={About} />
      </Switch>
    </>
  );
};

export default App;
