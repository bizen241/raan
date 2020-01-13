import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { GroupInvitationsDialog } from "../../dialogs/user-follows/GroupInvitationsDialog";
import { UserContext } from "../../project/Context";
import { Column, Menu, MenuItem } from "../../ui";

export const UserFollowerList = createEntityList("UserFollow")(
  React.memo(({ entity: userFollow, params }) => {
    const currentUser = useContext(UserContext);

    const [isGroupInvitationsDialogOpen, toggleGroupInvitationsDialog] = useToggleState();

    const { entity: userSummary } = useEntity("UserSummary", userFollow.followerSummaryId);
    if (userSummary === undefined) {
      return null;
    }

    const isTarget = currentUser.id === params.targetId;

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" underline="always" component={RouterLink} to={`/users/${userSummary.userId}`}>
              <Typography>{userSummary && userSummary.name}</Typography>
            </Link>
          </Column>
        </TableCell>
        {isTarget && (
          <TableCell padding="checkbox">
            <Menu>
              <MenuItem icon={<Email />} label="グループに招待" onClick={toggleGroupInvitationsDialog} />
            </Menu>
          </TableCell>
        )}
        <GroupInvitationsDialog
          followerId={userSummary.userId}
          isOpen={isGroupInvitationsDialogOpen}
          onClose={toggleGroupInvitationsDialog}
        />
      </TableRow>
    );
  })
);
