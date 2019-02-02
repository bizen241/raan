import { ContentEntity } from "./ContentEntity";
import { ContentRevisionEntity } from "./ContentRevisionEntity";
import { ContentTagEntity } from "./ContentTagEntity";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";
import { UserEntity } from "./UserEntity";
import { UserSessionEntity } from "./UserSessionEntity";

export * from "./ContentEntity";
export * from "./ContentRevisionEntity";
export * from "./ContentTagEntity";
export * from "./UserAccountEntity";
export * from "./UserEntity";
export * from "./UserConfigEntity";
export * from "./UserSessionEntity";

export type Entity =
  | ContentEntity
  | ContentRevisionEntity
  | ContentTagEntity
  | UserAccountEntity
  | UserConfigEntity
  | UserSessionEntity
  | UserEntity;

export const entities = [
  ContentEntity,
  ContentRevisionEntity,
  ContentTagEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserSessionEntity,
  UserEntity
];
