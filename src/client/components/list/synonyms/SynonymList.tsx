import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Synonym } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const SynonymList = createEntityList<Synonym>({ entityType: "Synonym" })(
  React.memo(({ entity: synonym }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/synonyms/${synonym.id}`}>
              <Typography>{synonym.name}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
