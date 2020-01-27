import { Typography } from "@material-ui/core";
import { Assessment } from "@material-ui/icons";
import React from "react";
import { withSearch } from "../../enhancers/withSearch";
import { Card, Column, Property } from "../ui";

export const SubmissionSummaryViewer = withSearch("SubmissionSummary")(
  React.memo(({ entities: submissionSummaries }) => {
    const submissionSummary = submissionSummaries[0];

    return (
      <Card icon={<Assessment />} title="自分の記録">
        {submissionSummary !== undefined ? (
          <Column>
            <Property label="提出回数">{submissionSummary.submitCount}</Property>
            <Property label="最初の提出">{new Date(submissionSummary.createdAt).toLocaleDateString()}</Property>
            <Property label="直近の提出">{new Date(submissionSummary.updatedAt).toLocaleDateString()}</Property>
          </Column>
        ) : (
          <Typography>まだ提出していません</Typography>
        )}
      </Card>
    );
  })
);