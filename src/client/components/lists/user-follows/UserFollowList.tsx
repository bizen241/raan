import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Link, TableRow } from "../../ui";

export const UserFollowList = createEntityList("UserFollow")(
  React.memo(({ entity: userFollow }) => {
    const { entity: userSummary } = useEntity("UserSummary", userFollow.targetSummaryId);

    return (
      <TableRow>
        <Link label={userSummary.name} to={`/users/${userSummary.userId}`} />
      </TableRow>
    );
  })
);
