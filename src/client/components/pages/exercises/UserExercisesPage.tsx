import { Edit } from "@material-ui/icons";
import { useContext, useMemo } from "react";
import * as React from "react";
import { ExerciseSummaryList } from "../../list/ExerciseSummaryList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button, Column } from "../../ui";
import { Page } from "../../ui/Page";

export const UserExercisesPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;

  const currentUser = useContext(UserContext);

  const initialParams = useMemo(() => ({ authorId: userId }), []);

  return (
    <Page title={userId === currentUser.id ? "自分のクイズ" : "ユーザーのクイズ"}>
      <Button icon={<Edit />} label="編集中のクイズ" to={`/exercises/edit`} />
      <Column pb={1}>
        <ExerciseSummaryList initialParams={initialParams} />
      </Column>
    </Page>
  );
});