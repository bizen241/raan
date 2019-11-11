import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { GroupInvitation, UserSummary } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column } from "../../ui";

export const GroupGroupInvitationList = createEntityList<GroupInvitation>({ entityType: "GroupInvitation" })(
  React.memo(({ entity: groupInvitation }) => {
    const { entity: userSummary } = useEntity<UserSummary>("UserSummary", groupInvitation.targetSummaryId);
    if (userSummary === undefined) {
      return null;
    }

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" underline="always" component={RouterLink} to={`/users/${userSummary.userId}`}>
              <Typography>{userSummary && userSummary.name}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);