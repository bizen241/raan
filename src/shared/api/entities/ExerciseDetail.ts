import { UUID } from "./BaseEntityObject";
import { ExerciseDetailObject } from "./ExerciseDetailObject";

export interface ExerciseDetail extends ExerciseDetailObject {
  contentId: UUID;
}
