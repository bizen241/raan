import { I18nProvider, Trans } from "@lingui/react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { installApp } from "./install";

export const renderApp = () => {
  ReactDOM.render(
    <I18nProvider language="en">
      <div>
        <main>
          <a href="/auth/github">
            <Trans>Welcome to Raaan!</Trans>
          </a>
        </main>
      </div>
    </I18nProvider>,
    document.getElementById("root")
  );

  if (process.env.NODE_ENV === "production") {
    installApp();
  }
};
