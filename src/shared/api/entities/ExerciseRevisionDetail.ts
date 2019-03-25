import { BaseEntityObject, UUID } from "./BaseEntityObject";
import { ExerciseDetailObject } from "./ExerciseDetailObject";

export interface ExerciseRevisionDetail extends BaseEntityObject, ExerciseDetailObject {
  revisionId: UUID;
}