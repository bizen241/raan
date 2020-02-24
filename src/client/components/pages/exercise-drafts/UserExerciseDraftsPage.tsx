import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { ExerciseSummaryList } from "../../lists/exercise-summaries/ExerciseSummaryList";

export const UserExerciseDraftsPage = createPage()(
  React.memo(({ t }) => t("保存された下書き")),
  React.memo(() => {
    const { currentUserId } = useCurrentUser();

    return (
      <ExerciseSummaryList
        initialParams={{
          authorId: currentUserId,
          isEditing: true
        }}
      />
    );
  })
);
