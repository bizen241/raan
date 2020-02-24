import { Edit } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { ExerciseSummaryList } from "../../lists/exercise-summaries/ExerciseSummaryList";
import { Button } from "../../ui";

export const UserExercisesPage = createPage<"User">()(
  React.memo(({ entityId: userId, t }) => {
    const { currentUserId } = useCurrentUser();
    const isOwn = currentUserId === userId;

    return isOwn ? t("自分の問題集") : t("ユーザーの問題集");
  }),
  React.memo(({ entityId: userId }) => {
    const { currentUserId } = useCurrentUser();
    const isOwn = userId === currentUserId;

    return (
      <>
        {isOwn && <Button icon={<Edit />} label="編集中の問題集" to="/exercises/edit" />}
        <ExerciseSummaryList
          initialParams={{
            authorId: userId
          }}
        />
      </>
    );
  })
);
