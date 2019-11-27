import * as React from "react";
import { createContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { Lang, User, UserAccount, UserConfig, UserSettings } from "../../../shared/api/entities";
import { RootState } from "../../reducers";

const guestUserId = Date.now().toString();
const guestUserConfigId = Date.now().toString();

export const guestUser: User = {
  id: guestUserId,
  name: "",
  permission: "Guest",
  summaryId: "",
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0
};
export const guestUserAccount: UserAccount = {
  id: guestUserConfigId,
  provider: "github",
  accountId: "",
  email: "guest@example.com",
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0
};
export const guestUserConfig: UserConfig = {
  id: guestUserConfigId,
  settings: {},
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0
};

export const defaultSettings: UserSettings = {
  "ui.lang": navigator.language.slice(0, 2) as Lang,
  "ui.colorScheme": "system"
};

export const UserContext = createContext<User>(guestUser);
export const SettingsContext = createContext<UserSettings>(defaultSettings);

export const Context = React.memo<{
  children: React.ReactNode;
}>(({ children }) => {
  const { user, userConfig, userConfigBuffer } = useSelector(({ app, cache, buffers }: RootState) => ({
    user: cache.get.User[app.userId],
    userConfig: cache.get.UserConfig[app.userConfigId],
    userConfigBuffer: buffers.UserConfig[app.userConfigId]
  }));
  if (user === undefined || userConfig === undefined) {
    throw new Error("ユーザーの取得に失敗しました");
  }

  const userSettings = useMemo(
    (): UserSettings => ({
      ...defaultSettings,
      ...((userConfigBuffer && userConfigBuffer.settings) || userConfig.settings)
    }),
    [userConfig, userConfigBuffer]
  );

  return (
    <UserContext.Provider value={user}>
      <SettingsContext.Provider value={userSettings}>{children}</SettingsContext.Provider>
    </UserContext.Provider>
  );
});
