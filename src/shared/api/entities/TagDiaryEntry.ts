import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface TagDiaryEntry extends BaseEntityObject {
  tagId?: EntityId<"Tag">;
  date: string;
  submittedCount: number;
  typedCount: number;
}
