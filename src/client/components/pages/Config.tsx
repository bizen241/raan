import { Button, Callout, Classes, Divider } from "@blueprintjs/core";
import { Trans } from "@lingui/react";
import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { EntityEditor } from "../editor";
import { UserContext } from "../project/Context";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { Page } from "./Page";

export const Config = connector(
  state => ({
    hasUpdate: state.app.hasUpdate
  }),
  () => ({}),
  ({ hasUpdate }) => {
    const currentUser = useContext(UserContext);
    const isGuest = currentUser.permission === "Guest";

    return (
      <Page>
        <Header heading="設定" />
        <Column padding>
          <Column padding>
            {hasUpdate ? (
              <Button text="アップデート" onClick={() => location.reload()} />
            ) : (
              <Callout intent="success" title="最新のバージョンです" />
            )}
          </Column>
          {isGuest ? (
            <Column padding>
              <Link className={`${Classes.BUTTON} ${Classes.INTENT_PRIMARY} ${Classes.iconClass("key")}`} to="/login">
                <Trans>ログイン</Trans>
              </Link>
              <Divider />
            </Column>
          ) : null}
          <Column padding>
            <EntityEditor entityType="UserConfig" entityId={currentUser.configId} />
          </Column>
          {!isGuest ? (
            <Column padding>
              <Divider />
              <a href="/logout" className={`${Classes.BUTTON} ${Classes.iconClass("key")}`}>
                <Trans>アカウント</Trans>
              </a>
            </Column>
          ) : null}
        </Column>
      </Page>
    );
  }
);
