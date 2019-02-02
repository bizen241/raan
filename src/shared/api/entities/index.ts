import { Content } from "./Content";
import { ContentRevision } from "./ContentRevision";
import { ContentTag } from "./ContentTag";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserConfig } from "./UserConfig";
import { UserSession } from "./UserSession";

export * from "./Content";
export * from "./ContentRevision";
export * from "./ContentTag";
export * from "./User";
export * from "./UserAccount";
export * from "./UserConfig";
export * from "./UserSession";

export type EntityType =
  | "Content"
  | "ContentRevision"
  | "ContentTag"
  | "User"
  | "UserConfig"
  | "UserAccount"
  | "UserSession";

export type EntityObject = Content | ContentRevision | ContentTag | User | UserAccount | UserConfig | UserSession;
