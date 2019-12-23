import * as React from "react";
import { ReportList } from "../../list/reports/ReportList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

export const UserUploadedReportsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="ユーザーの報告一覧">
      <ReportList
        initialParams={{
          reporterId: userId
        }}
      />
    </Page>
  );
});