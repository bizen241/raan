import * as React from "react";
import { UserDiaryGraph } from "../../graphs/UserDiaryGraph";
import { PageProps } from "../../project/Router";
import { Card, Page } from "../../ui";

export const UserDiaryPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="ユーザーの記録">
      <Card>
        <UserDiaryGraph entityId={userId} />
      </Card>
    </Page>
  );
});
