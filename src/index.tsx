import * as React from "react";
import * as ReactDOM from "react-dom";
import { BitmexStateProvider } from "./utils/bitmex_state";
import { BitmexRestProvider } from "./utils/bitmex_rest";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IndexPage } from "./containers/IndexPage";
import { NotFoundPage } from "./containers/NotFoundPage";
import "./assets/scss/main.scss";

ReactDOM.render(
  <BitmexRestProvider>
    <BitmexStateProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact component={NotFoundPage} />
        </Switch>
      </Router>
    </BitmexStateProvider>
  </BitmexRestProvider>,
  document.getElementById("root"),
);
