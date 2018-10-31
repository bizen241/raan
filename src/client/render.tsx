import * as React from "react";
import * as ReactDOM from "react-dom";
import { installApp } from "./install";

export const renderApp = () => {
  ReactDOM.render(
    <div>
      <a href="/auth/github">Welcome to Raaan!</a>
    </div>,
    document.getElementById("root")
  );

  if (process.env.NODE_ENV === "production") {
    installApp();
  }
};
