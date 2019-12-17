import { UUID } from "./BaseEntityObject";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface Exercise extends BaseExerciseObject {
  summaryId: UUID;
  authorId: UUID;
  latestId: UUID;
  draftId: UUID;
  isDraft: boolean;
  isPrivate: boolean;
  isLocked: boolean;
}
