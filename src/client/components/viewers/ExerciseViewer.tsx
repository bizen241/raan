import { PlayArrow, PlaylistAdd } from "@material-ui/icons";
import React from "react";
import { EntityId } from "../../../shared/api/entities";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { PlaylistItemsDialog } from "../dialogs/exercises/PlaylistItemsDialog";
import { ExercisePlayer } from "../player/dialogs/ExercisePlayer";
import { ExercisePreviewer } from "../player/dialogs/ExercisePreviewer";
import { Button, Column } from "../ui";
import { ExerciseSummaryViewer } from "./ExerciseSummaryViewer";
import { SubmissionSummaryViewer } from "./SubmissionSummaryViewer";

export const ExerciseViewer = React.memo<{
  exerciseId: EntityId<"Exercise">;
}>(({ exerciseId }) => {
  const { currentUser } = useCurrentUser();

  const { entity: exercise } = useEntity("Exercise", exerciseId);

  const [isExercisePlayerOpen, onToggleExercisePlayer] = useToggleState();
  const [isExercisePreviewerOpen, onToggleExercisePreviewer] = useToggleState();
  const [isPlaylistDialogOpen, onTogglePlaylistDialog] = useToggleState();

  const { isDraft } = exercise;
  const isGuest = currentUser.permission === "Guest";

  return (
    <Column>
      {!isDraft && <Button color="primary" icon={<PlayArrow />} label="始める" onClick={onToggleExercisePlayer} />}
      {isDraft && <Button icon={<PlayArrow />} label="プレビュー" onClick={onToggleExercisePreviewer} />}
      {!isGuest && <Button icon={<PlaylistAdd />} label="プレイリストに追加" onClick={onTogglePlaylistDialog} />}
      <ExerciseSummaryViewer exerciseId={exerciseId} exercise={exercise} />
      {!isGuest && <SubmissionSummaryViewer submitterId={currentUser.id} exerciseId={exerciseId} />}
      <ExercisePlayer exerciseId={exerciseId} isOpen={isExercisePlayerOpen} onClose={onToggleExercisePlayer} />
      <ExercisePreviewer exercise={exercise} isOpen={isExercisePreviewerOpen} onClose={onToggleExercisePreviewer} />
      <PlaylistItemsDialog exerciseId={exerciseId} isOpen={isPlaylistDialogOpen} onClose={onTogglePlaylistDialog} />
    </Column>
  );
});
