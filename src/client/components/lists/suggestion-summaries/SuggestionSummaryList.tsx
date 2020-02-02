import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { UserContext } from "../../project/Context";
import { Column, IconButton } from "../../ui";

export const SuggestionSummaryList = createEntityList("SuggestionSummary")(
  React.memo(({ entity: suggestionSummary }) => {
    const currentUser = useContext(UserContext);

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/suggestions/${suggestionSummary.suggestionId}`}>
              <Typography>{suggestionSummary.messageSubject || "件名なし"}</Typography>
            </Link>
          </Column>
        </TableCell>
        {suggestionSummary.authorId === currentUser.id ? (
          <TableCell padding="checkbox">
            <IconButton icon={Edit} to={`/suggestions/${suggestionSummary.suggestionId}/edit`} />
          </TableCell>
        ) : null}
      </TableRow>
    );
  })
);
