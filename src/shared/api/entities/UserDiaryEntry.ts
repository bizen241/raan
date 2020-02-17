import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface UserDiaryEntry extends BaseEntityObject {
  userId?: EntityId<"User">;
  date: string;
  submitCount: number;
  typeCount: number;
  submittedCount: number;
  typedCount: number;
  createCount: number;
  editCount: number;
}
