import { Typography } from "@material-ui/core";
import { SmsFailed } from "@material-ui/icons";
import { push } from "connected-react-router";
import { useCallback } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { ObjectionTarget } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Button, Card, DialogContent } from "../../ui";

export const ConfirmObjectionDialog = createDialog<{
  targetType: ObjectionTarget;
  targetId: string;
}>(
  React.memo(({ targetType, targetId, onClose }) => {
    const dispatch = useDispatch();

    const onCreate = useCallback(() => {
      const bufferId = generateBufferId();

      dispatch(
        actions.buffers.update("Objection", bufferId, {
          targetType,
          targetId
        })
      );
      dispatch(push(`/objections/${bufferId}/edit`));
    }, []);

    return (
      <DialogContent title="抗議する" onClose={onClose}>
        <Card>
          <Typography>本当に抗議しますか？</Typography>
        </Card>
        <Button icon={<SmsFailed />} label="抗議する" onClick={onCreate} />
      </DialogContent>
    );
  })
);