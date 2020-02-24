import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ExerciseDiaryGraph } from "../../graphs/ExerciseDiaryGraph";

export const ExerciseDiaryPage = createPage()(
  React.memo(({ t }) => t("問題集の記録")),
  React.memo(({ entityId: exerciseId }) => {
    return <ExerciseDiaryGraph entityId={exerciseId} />;
  })
);
