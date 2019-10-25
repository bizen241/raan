import { Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { Message } from "../../project/Message";
import { Button, DialogContent, DialogHeader, Row } from "../../ui";
import { useStyles } from "../../ui/styles";

export const LogoutDialog = createDialog<{}>(
  React.memo(({ onClose }) => {
    const classes = useStyles();

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>
            <Message id="logout" />
          </Typography>
        </DialogHeader>
        <DialogContent>
          <Row alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>すべての下書きがブラウザから削除されます。</Typography>
          </Row>
          <Button label={<Message id="logout" />} labelColor="error" href="/logout" />
          <Button label="キャンセル" onClick={onClose} />
        </DialogContent>
      </>
    );
  })
);
