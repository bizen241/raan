import { Box, Button, Card, CardContent, Dialog, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { Delete, Edit, MoreVert, PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { EntityViewer, EntityViewerContainerProps, EntityViewerRendererProps } from ".";
import { Exercise } from "../../../shared/api/entities";
import { actions } from "../../reducers";
import { ExercisePlayer } from "../player/ExercisePlayer";
import { UserContext } from "../project/Context";
import { useStyles } from "../ui/styles";
import { ExerciseSummaryViewer } from "./ExerciseSummaryViewer";
import { SubmissionSummaryViewer } from "./SubmissionSummaryViewer";

export const ExerciseViewer = React.memo<EntityViewerContainerProps>(props => {
  return <EntityViewer {...props} entityType="Exercise" renderer={ExerciseViewerRenderer} />;
});

const ExerciseViewerRenderer = React.memo<EntityViewerRendererProps<Exercise>>(
  ({ entityId: exerciseId, entity: exercise }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const [isExercisePreviewerOpen, toggleExercisePreviewer] = useState(false);
    const onToggleExercisePreviewer = useCallback(() => toggleExercisePreviewer(s => !s), []);

    const [menuAnchorElement, setMenuAnchorElement] = useState(null);

    const classes = useStyles();

    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex">
          <Box flex={1} />
          <Box>
            <IconButton onClick={useCallback(e => setMenuAnchorElement(e.currentTarget), [])}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={menuAnchorElement}
              open={Boolean(menuAnchorElement)}
              onClose={useCallback(() => setMenuAnchorElement(null), [])}
            >
              <MenuItem onClick={useCallback(() => dispatch(actions.api.delete("Exercise", exerciseId)), [])}>
                <Delete className={classes.leftIcon} />
                削除
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <Typography variant="h4">{exercise.title || "無題"}</Typography>
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <Card>
            <CardContent>
              <SubmissionSummaryViewer userId={currentUser.id} exerciseId={exerciseId} />
            </CardContent>
          </Card>
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <Card>
            <CardContent>
              <ExerciseSummaryViewer entityId={exercise.summaryId} />
            </CardContent>
          </Card>
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            color="primary"
            onClick={onToggleExercisePreviewer}
          >
            <PlayArrow className={classes.leftIcon} />
            始める
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            component={RouterLink}
            to={`/exercises/${exerciseId}/edit`}
          >
            <Edit className={classes.leftIcon} />
            編集する
          </Button>
        </Box>
        <Dialog fullScreen open={isExercisePreviewerOpen} onClose={onToggleExercisePreviewer}>
          <ExercisePlayer exerciseId={exerciseId} onClose={onToggleExercisePreviewer} />
        </Dialog>
      </Box>
    );
  }
);
