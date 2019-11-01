import * as React from "react";
import { useContext } from "react";
import { GroupExercise } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { ExerciseContext, ToggleGroupExerciseList } from "../../list/groups/ToggleGroupExerciseList";
import { UserContext } from "../../project/Context";
import { DialogContent } from "../../ui";

export const GroupExercisesDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    const currentUser = useContext(UserContext);

    const { onReload: onReloadGroupExercises } = useSearch<GroupExercise>("GroupExercise", {
      exerciseId
    });

    return (
      <DialogContent title="クイズをグループに公開" onClose={onClose}>
        <ExerciseContext.Provider value={exerciseId}>
          <ToggleGroupExerciseList
            initialParams={{
              userId: currentUser.id
            }}
            onReload={onReloadGroupExercises}
          />
        </ExerciseContext.Provider>
      </DialogContent>
    );
  })
);