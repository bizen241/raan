import { Description, Group, Storage, SystemUpdate, Timeline } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { Button } from "../../ui";

export const AppPage = createPage()(
  React.memo(({ t }) => t("アプリ")),
  React.memo(() => {
    return (
      <>
        <Button icon={<Group />} label="コミュニテイ" to="/app/community" />
        <Button icon={<Timeline />} label="記録" to="/app/diary" />
        <Button icon={<SystemUpdate />} label="バージョン" to="/app/version" />
        <Button icon={<Storage />} label="キャッシュ" to="/app/cache" />
        <Button icon={<Description />} label="ライセンス" to="/app/dependencies" />
      </>
    );
  })
);
