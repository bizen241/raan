import { Bookmarks, Group, History, Keyboard, Timeline } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { User } from "../../../../shared/api/entities";
import { withEntity } from "../../../enhancers/withEntity";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button, Column, Page } from "../../ui";
import { UserSummaryViewer } from "../../viewer/UserSummaryViewer";

export const UserPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  const currentUser = useContext(UserContext);

  const isOwn = userId === currentUser.id;

  return (
    <Page title={isOwn ? "マイページ" : "ユーザーページ"}>
      <UserPageContent entityId={userId} />
    </Page>
  );
});

const UserPageContent = withEntity<User, {}>({ entityType: "User" })(({ entityId: userId, entity: user }) => {
  const currentUser = useContext(UserContext);

  const isOwn = userId === currentUser.id;

  return (
    <>
      <Button icon={<Keyboard />} label="自分のコンテンツ" color="primary" to={`/users/${userId}/contents`} />
      <Column pb={1}>
        <UserSummaryViewer entityId={user.summaryId} />
      </Column>
      {isOwn && <Button icon={<History />} label="復習" to="/submissions" />}
      {isOwn && <Button icon={<Timeline />} label="記録" to="/statistics" />}
      {isOwn && <Button icon={<Bookmarks />} label="ブックマーク" to="/playlist-bookmarks" />}
      {isOwn && <Button icon={<Group />} label="グループ" to="/groups" />}
    </>
  );
});
