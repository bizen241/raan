import { UUID } from "./BaseEntityObject";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface Revision extends BaseExerciseObject {
  summaryId: UUID;
  exerciseId: UUID;
  messageSubject: string;
  messageBody: string;
}
