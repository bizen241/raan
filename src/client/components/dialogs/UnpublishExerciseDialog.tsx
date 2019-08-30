import { Box, Button, Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog, DialogContent, DialogHeader } from ".";
import { Exercise } from "../../../shared/api/entities";
import { actions } from "../../reducers";
import { useStyles } from "../ui/styles";

export const UnpublishExerciseDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onUnpublish = () => {
      dispatch(actions.buffers.add("Exercise", exerciseId));
      dispatch(actions.buffers.update<Exercise>("Exercise", exerciseId, { isPrivate: true }));
      dispatch(actions.api.upload("Exercise", exerciseId));
      onClose();
    };

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>問題集の公開を終了</Typography>
        </DialogHeader>
        <DialogContent>
          <Box display="flex" alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>問題集が非公開に設定されます。</Typography>
          </Box>
          <Box display="flex" flexDirection="column" pb={1}>
            <Button className={classes.largeButton} variant="contained" onClick={onUnpublish}>
              <Typography color="error">問題集の公開を終了</Typography>
            </Button>
          </Box>
          <Box display="flex" flexDirection="column" pb={1}>
            <Button className={classes.largeButton} variant="contained" onClick={onClose}>
              <Typography>キャンセル</Typography>
            </Button>
          </Box>
        </DialogContent>
      </>
    );
  })
);