import { TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createEntityTypeToObject, EntityType } from "../../../../shared/api/entities";
import { createPage } from "../../../enhancers/createPage";
import { actions } from "../../../reducers";
import { Button, Card, IconButton, Table } from "../../ui";

const entityTypes = Object.keys(createEntityTypeToObject()) as EntityType[];

export const CachePage = createPage()(
  React.memo(({ t }) => t("キャッシュ")),
  React.memo(() => {
    const dispatch = useDispatch();

    return (
      <>
        <Button
          icon={<Delete />}
          label="キャッシュを削除"
          onClick={() => {
            dispatch(actions.cache.purge(undefined, undefined));
          }}
        />
        <Button
          icon={<Delete />}
          label="ストレージをクリア"
          onClick={() => {
            localStorage.clear();
            location.reload();
          }}
        />
        <Card padding={false}>
          <Table>
            {entityTypes.map((entityType) => (
              <TableRow key={entityType}>
                <TableCell>
                  <Typography>{entityType}</Typography>
                </TableCell>
                <TableCell padding="checkbox">
                  <IconButton icon={Delete} onClick={() => dispatch(actions.cache.purge(entityType, undefined))} />
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Card>
      </>
    );
  })
);
