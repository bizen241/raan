import { Button, Callout, Classes } from "@blueprintjs/core";
import { Trans } from "@lingui/react";
import { useCallback } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { configActions } from "../../reducers/config";
import { LangSettingEditor } from "../config/LangSettingEditor";
import { ThemeSettingEditor } from "../config/ThemeSettingEditor";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { Page } from "./Page";

export const Config = connector(
  state => ({
    hasUpdate: state.app.hasUpdate,
    config: state.config.current,
    isLoggedIn: state.app.user.permission !== "Guest"
  }),
  () => ({
    updateSettings: configActions.updateSettings
  }),
  ({ hasUpdate, config, isLoggedIn, updateSettings }) => {
    return (
      <Page>
        <Header heading="設定" />
        <Column padding="small">
          <Column padding="small">
            {hasUpdate ? (
              <Button text="アップデート" onClick={() => location.reload()} />
            ) : (
              <Callout intent="success" title="最新のバージョンです" />
            )}
          </Column>
          {!isLoggedIn ? (
            <Column padding="small">
              <Link className={`${Classes.BUTTON} ${Classes.INTENT_PRIMARY} ${Classes.iconClass("key")}`} to="/login">
                <Trans>ログイン</Trans>
              </Link>
            </Column>
          ) : null}
          <Column padding="small">
            <ThemeSettingEditor
              value={config.settings.theme}
              onChange={useCallback(value => updateSettings("theme", value), [])}
            />
          </Column>
          <Column padding="small">
            <LangSettingEditor
              value={config.settings.lang}
              onChange={useCallback(value => updateSettings("lang", value), [])}
            />
          </Column>
          {isLoggedIn ? (
            <Column padding="small">
              <a href="/logout" className={`${Classes.BUTTON} ${Classes.INTENT_DANGER} ${Classes.iconClass("key")}`}>
                <Trans>ログアウト</Trans>
              </a>
            </Column>
          ) : null}
        </Column>
      </Page>
    );
  }
);
