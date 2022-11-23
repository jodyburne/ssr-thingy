import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.hydrate(<App />, document.getElementById("root"));

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
