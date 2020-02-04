import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { UserViewer } from "../../viewers/UserViewer";

export const UserPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  const currentUser = useCurrentUser();

  const isOwn = userId === currentUser.id;

  return (
    <Page title={isOwn ? "マイページ" : "ユーザーの詳細"}>
      <UserViewer entityId={userId} />
    </Page>
  );
});
