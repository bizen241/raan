import { MenuItem } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Exercise } from "../../../../shared/api/entities";
import { connector } from "../../../reducers";
import { apiActions } from "../../../reducers/api";
import { buffersActions } from "../../../reducers/buffers";
import { PopMenu, Row } from "../../ui";
import { List } from "../List";

export const ExerciseList = connector(
  state => ({
    searchResult: state.cache.search.Exercise[""],
    exerciseCache: state.cache.get.Exercise
  }),
  () => ({
    deleteBuffer: buffersActions.delete,
    search: apiActions.search
  }),
  ({ searchResult, exerciseCache, deleteBuffer, search }) => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const onDelete = useCallback((id: string) => deleteBuffer("ExerciseRevision", id), []);

    useEffect(() => {
      if (
        searchResult === undefined ||
        searchResult.ids.length < offset + limit ||
        searchResult.ids.slice(offset, offset + limit).some(id => id === undefined)
      ) {
        search<Exercise>("Exercise", {
          limit,
          offset
        });
      }
    }, [limit, offset]);

    if (searchResult === undefined) {
      return <div>Loading...</div>;
    }

    const exercises = searchResult.ids
      .slice(offset, offset + limit)
      .map(exerciseId => exerciseId && exerciseCache[exerciseId]);

    return (
      <List
        limit={limit}
        offset={offset}
        count={searchResult.count}
        onChangeLimit={setLimit}
        onChangeOffset={setOffset}
        focusKey="s"
      >
        {exercises.map(
          exercise => exercise && <ExerciseListItem key={exercise.id} exercise={exercise} onDelete={onDelete} />
        )}
      </List>
    );
  }
);

const ExerciseListItem: React.FunctionComponent<{
  exercise: Exercise;
  onDelete: (id: string) => void;
}> = ({ exercise, onDelete }) => {
  return (
    <Row center="cross">
      <Row flex={1}>
        <Link style={{ flex: 1 }} to={`/exercise-details/${exercise.detailId}/edit`}>
          {exercise.title || "無題"}
        </Link>
      </Row>
      <PopMenu
        items={[
          <MenuItem key="p" text="プレビュー (p)" />,
          <MenuItem key="d" text="削除 (d)" onClick={useCallback(() => onDelete(exercise.id), [])} intent="danger" />
        ]}
        hotKeys={{}}
      />
    </Row>
  );
};
