import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { Page } from "./Page";

export const Home = connector(
  () => ({}),
  () => ({}),
  () => {
    return (
      <Page>
        <Header heading="ホーム" />
        <Column padding="small">
          <Column padding="small">
            <Link className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.DISABLED}`} to="/player">
              練習する (P)
            </Link>
          </Column>
          <Column padding="small">
            <Link className={`${Classes.BUTTON} ${Classes.LARGE}`} to="/creator">
              作成する (C)
            </Link>
          </Column>
        </Column>
      </Page>
    );
  }
);
