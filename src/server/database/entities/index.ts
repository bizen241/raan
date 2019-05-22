import { EntityManager } from "typeorm";
import { ExerciseEntity } from "./ExerciseEntity";
import { ExerciseSummaryEntity } from "./ExerciseSummaryEntity";
import { ExerciseTagEntity } from "./ExerciseTagEntity";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";
import { UserEntity } from "./UserEntity";
import { UserSessionEntity } from "./UserSessionEntity";

export * from "./ExerciseEntity";
export * from "./ExerciseSummaryEntity";
export * from "./ExerciseTagEntity";
export * from "./UserAccountEntity";
export * from "./UserConfigEntity";
export * from "./UserEntity";
export * from "./UserSessionEntity";

export type Entity =
  | ExerciseEntity
  | ExerciseSummaryEntity
  | ExerciseTagEntity
  | UserAccountEntity
  | UserConfigEntity
  | UserEntity
  | UserSessionEntity;

export const entities = [
  ExerciseEntity,
  ExerciseSummaryEntity,
  ExerciseTagEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserEntity,
  UserSessionEntity
];

export type EntityCreator<E extends Entity> = (manager: EntityManager, params: Partial<E>) => Promise<E>;
