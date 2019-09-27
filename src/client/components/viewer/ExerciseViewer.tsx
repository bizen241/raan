import { Button, Typography } from "@material-ui/core";
import { PlayArrow, PlaylistAdd } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Exercise } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { PlaylistDialog } from "../dialogs/PlaylistDialog";
import { ExercisePlayer } from "../player/dialogs/ExercisePlayer";
import { UserContext } from "../project/Context";
import { Column } from "../ui";
import { useStyles } from "../ui/styles";
import { ExerciseSummaryViewer } from "./ExerciseSummaryViewer";
import { SubmissionSummaryViewer } from "./SubmissionSummaryViewer";

export const ExerciseViewer = withEntity<Exercise>({ entityType: "Exercise" })(
  React.memo(({ entity: exercise, entityId: exerciseId }) => {
    const classes = useStyles();
    const currentUser = useContext(UserContext);

    const [isExercisePlayerOpen, onToggleExercisePlayer] = useToggleState();
    const [isPlaylistDialogOpen, onTogglePlaylistDialog] = useToggleState();

    const isGuest = currentUser.permission === "Guest";

    return (
      <Column>
        <Column pb={1}>
          <Button className={classes.largeButton} variant="contained" color="primary" onClick={onToggleExercisePlayer}>
            <PlayArrow className={classes.leftIcon} />
            <Typography>始める</Typography>
          </Button>
        </Column>
        {!isGuest && (
          <Column pb={1}>
            <Button className={classes.largeButton} variant="contained" onClick={onTogglePlaylistDialog}>
              <PlaylistAdd className={classes.leftIcon} />
              <Typography>プレイリストに追加</Typography>
            </Button>
          </Column>
        )}
        <Column pb={1}>
          <ExerciseSummaryViewer entityId={exercise.summaryId} />
        </Column>
        {!isGuest && (
          <Column pb={1}>
            <SubmissionSummaryViewer submitterId={currentUser.id} exerciseId={exerciseId} />
          </Column>
        )}
        <ExercisePlayer exerciseId={exerciseId} isOpen={isExercisePlayerOpen} onClose={onToggleExercisePlayer} />
        <PlaylistDialog exerciseId={exerciseId} isOpen={isPlaylistDialogOpen} onClose={onTogglePlaylistDialog} />
      </Column>
    );
  })
);
