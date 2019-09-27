import { Button, Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { createDialog } from "../../enhancers/createDialog";
import { Column, DialogContent, DialogHeader, Row } from "../ui";
import { useStyles } from "../ui/styles";

export const DeleteQuestionDialog = createDialog<{
  onDelete: () => void;
}>(
  React.memo(({ onDelete, onClose }) => {
    const classes = useStyles();

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>問題の削除</Typography>
        </DialogHeader>
        <DialogContent>
          <Row alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>問題が問題集から削除されます。</Typography>
          </Row>
          <Column pb={1}>
            <Button
              className={classes.largeButton}
              variant="contained"
              onClick={() => {
                onDelete();
                onClose();
              }}
            >
              <Typography color="error">問題を削除</Typography>
            </Button>
          </Column>
          <Column pb={1}>
            <Button className={classes.largeButton} variant="contained" onClick={onClose}>
              <Typography>キャンセル</Typography>
            </Button>
          </Column>
        </DialogContent>
      </>
    );
  })
);
