import { Typography } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const DeleteGroupMemberByOwnerDialog = createDialog<{
  groupMemberId: EntityId<"GroupMember">;
}>()(
  React.memo(({ t }) => t("メンバーの追放")),
  React.memo(({ groupMemberId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("GroupMember", groupMemberId, dialogTimeout, onClose));
    };

    return (
      <>
        <Card>
          <Typography>メンバーを追放します。</Typography>
        </Card>
        <Button icon={<RemoveCircle color="error" />} label="メンバーを追放" labelColor="error" onClick={onDelete} />
      </>
    );
  })
);
