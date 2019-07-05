import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseSummaryEntity } from "./ExerciseSummaryEntity";

@Entity("exercise_tags")
export class ExerciseTagEntity extends BaseEntityClass {
  type: "ExerciseTag" = "ExerciseTag";

  @ManyToOne(() => ExerciseSummaryEntity, exercise => exercise.tags, {
    onDelete: "CASCADE"
  })
  exerciseSummary?: ExerciseSummaryEntity;

  @Column()
  name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }
}
