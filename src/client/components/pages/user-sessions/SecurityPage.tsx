import { Devices, Warning } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteAccountDialog } from "../../dialogs/user/DeleteAccountDialog";
import { LogoutDialog } from "../../dialogs/user/LogoutDialog";
import { Button } from "../../ui";

export const SecurityPage = createPage()(
  React.memo(({ t }) => t("セキュリティ")),
  React.memo(() => {
    const { currentUser } = useCurrentUser();

    const [isLogoutDialogOpen, onToggleLogoutDialog] = useToggleState();
    const [isDeleteAccountDialogOpen, onToggleDeleteAccountDialog] = useToggleState();

    const isOwner = currentUser.permission === "Owner";

    return (
      <>
        <Button icon={<Devices />} label="セッション一覧" to="/user/security/sessions" />
        <Button icon={<Warning color="error" />} label="ログアウト" labelColor="error" onClick={onToggleLogoutDialog} />
        {!isOwner && (
          <Button
            icon={<Warning color="error" />}
            label="アカウントを削除"
            labelColor="error"
            onClick={onToggleDeleteAccountDialog}
          />
        )}
        <LogoutDialog isOpen={isLogoutDialogOpen} onClose={onToggleLogoutDialog} />
        <DeleteAccountDialog isOpen={isDeleteAccountDialogOpen} onClose={onToggleDeleteAccountDialog} />
      </>
    );
  })
);
