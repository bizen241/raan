import React, { useContext } from "react";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";
import { UserViewer } from "../../viewer/UserViewer";

export const UserPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  const currentUser = useContext(UserContext);

  const isOwn = userId === currentUser.id;

  return (
    <Page title={isOwn ? "マイページ" : "ユーザーの詳細"}>
      <UserViewer entityId={userId} />
    </Page>
  );
});
