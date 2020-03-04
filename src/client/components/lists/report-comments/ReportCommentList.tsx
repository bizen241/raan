import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column, IconButton } from "../../ui";

export const ReportCommentList = createEntityList("ReportComment")(
  React.memo(({ entity: reportComment, onReload }) => {
    const { entity: authorSummary } = useEntity("UserSummary", reportComment.authorId);
    if (authorSummary === undefined) {
      return (
        <Column>
          <IconButton icon={Refresh} onClick={onReload} />
        </Column>
      );
    }

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/users/${reportComment.authorId}`}>
              <Typography>{authorSummary.name}</Typography>
            </Link>
            <Typography>{reportComment.body}</Typography>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
