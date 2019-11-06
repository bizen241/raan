import { IconButton, Link, TableCell, TableRow } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseObjection } from "../../../../shared/api/entities";
import { createBufferList } from "../../../enhancers/createBufferList";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteExerciseObjectionBufferDialog } from "../../dialogs/exercise-objections/DeleteExerciseObjectionBufferDialog";
import { Column } from "../../ui";

export const ExerciseObjectionBufferList = createBufferList<ExerciseObjection>({ entityType: "ExerciseObjection" })(
  React.memo(({ bufferId, buffer, source }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/exercise-objections/${bufferId}/edit`}>
              {buffer.targetId || (source && source.targetId)}
            </Link>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton onClick={onToggleDeleteDialog}>
            <Delete />
          </IconButton>
        </TableCell>
        <DeleteExerciseObjectionBufferDialog
          bufferId={bufferId}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);