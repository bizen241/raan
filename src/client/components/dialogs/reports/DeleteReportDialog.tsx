import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeleteReportDialog = createDialog<{
  reportId: string;
}>(
  React.memo(({ reportId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("Report", reportId, dialogTimeout, onClose));
    };

    return (
      <DialogContent title="報告の削除" onClose={onClose}>
        <Card>
          <Typography>報告がサーバーから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="報告を削除" labelColor="error" onClick={onDelete} />
      </DialogContent>
    );
  })
);