import React from "react";
import Home from "./home";
import Detail from "./detail";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

const BasicRoute = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/detail" component={Detail} />
    </Switch>
  </Router>
);

export default BasicRoute;
