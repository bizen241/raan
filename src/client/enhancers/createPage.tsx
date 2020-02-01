import { Avatar, Box, IconButton, Typography } from "@material-ui/core";
import { ArrowBack, Home, Mail, Person, Settings, Web } from "@material-ui/icons";
import { goBack } from "connected-react-router";
import { TFunction } from "i18next";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../components/project/Context";
import { PageProps } from "../components/project/Router";
import { Column, Menu, MenuItem, PageContent, PageHeader } from "../components/ui";
import { useEntity } from "../hooks/useEntity";
import { RootState } from "../reducers";

export const createPage = () => (
  TitleComponent: React.ComponentType<PageProps & { t: TFunction }>,
  BodyComponent: React.ComponentType<PageProps & { t: TFunction }>
) =>
  React.memo<PageProps>(props => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const currentUser = useContext(UserContext);

    const { entity: currentUserSummary } = useEntity("UserSummary", currentUser.summaryId);
    const pathname = useSelector((state: RootState) => state.router.location.pathname);

    return (
      <Column alignItems="center" width="100%" position="absolute" top={0} left={0}>
        <PageHeader>
          <IconButton onClick={useCallback(() => dispatch(goBack()), [])} style={{ padding: "16px" }}>
            <ArrowBack />
          </IconButton>
          <Typography component="span">
            <TitleComponent {...props} t={t} />
          </Typography>
          <Box flex={1} />
          <Menu
            icon={
              currentUserSummary && currentUserSummary.emailHash ? (
                <Avatar src={`https://www.gravatar.com/avatar/${currentUserSummary.emailHash}?d=identicon`} />
              ) : (
                <Person />
              )
            }
          >
            <MenuItem icon={<Home />} label="ホーム" disabled={pathname === "/"} to="/" />
            <MenuItem
              icon={<Mail />}
              label="通知"
              disabled={pathname === "/user/notifications/messages"}
              to="/user/notifications/messages"
            />
            <MenuItem icon={<Web />} label="アプリ" disabled={pathname === "/app"} to="/app" />
            <MenuItem icon={<Person />} label="アカウント" disabled={pathname === "/user/account"} to="/user/account" />
            <MenuItem icon={<Settings />} label="設定" disabled={pathname === "/user/config"} to="/user/config" />
          </Menu>
        </PageHeader>
        <PageContent>
          <BodyComponent {...props} t={t} />
        </PageContent>
      </Column>
    );
  });