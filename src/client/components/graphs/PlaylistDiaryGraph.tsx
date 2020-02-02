import { Refresh, Timeline } from "@material-ui/icons";
import React, { useMemo, useState } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useDiary } from "../../hooks/useDiary";
import { Card, getToday, HeatMap, HeatMapContents, IconButton, Property } from "../ui";

export const PlaylistDiaryGraph = withEntity("Playlist")(({ entityId: playlistId }) => {
  const [firstDate] = useState(getToday());
  const [selectedDate, selectDate] = useState(firstDate.toString());

  const { diaryEntries, onReload } = useDiary("PlaylistDiaryEntry", firstDate, { playlistId });

  const contents = useMemo(
    () =>
      Object.entries(diaryEntries).reduce((previousValue, [date, diaryEntry]) => {
        if (diaryEntry === undefined) {
          return previousValue;
        }

        return { ...previousValue, [date]: diaryEntry.submittedCount };
      }, {} as HeatMapContents),
    [diaryEntries]
  );

  const selectedDiaryEntry = diaryEntries[selectedDate];

  return (
    <Card icon={<Timeline />} title="記録" action={<IconButton icon={Refresh} onClick={onReload} />}>
      <HeatMap firstDate={firstDate} contents={contents} onClick={selectDate} />
      <Property label="日付">{new Date(Number(selectedDate)).toLocaleDateString()}</Property>
      <Property label="タイプ数">{(selectedDiaryEntry && selectedDiaryEntry.typedCount) || 0}</Property>
      <Property label="提出回数">{(selectedDiaryEntry && selectedDiaryEntry.submittedCount) || 0}</Property>
    </Card>
  );
});
