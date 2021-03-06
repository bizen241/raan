import { Column } from "typeorm";
import { EntityType, ExerciseContent, Question, Reference } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";

export abstract class BaseExerciseClass<T extends EntityType> extends BaseEntityClass<T> {
  @Column()
  lang!: string;

  @Column()
  title!: string;

  @Column("json")
  tags!: string[];

  @Column()
  description!: string;

  @Column("json")
  questions!: Question[];

  @Column("json")
  references!: Reference[];

  @Column()
  isRandom!: boolean;

  constructor(params: Partial<ExerciseContent> | undefined) {
    super();

    if (params !== undefined) {
      updateExerciseContent(this, params);
    }
  }
}

export const updateExerciseContent = <T extends EntityType>(
  entity: BaseExerciseClass<T>,
  params: Partial<ExerciseContent>
) => {
  entity.lang = params.lang || entity.lang || "en";
  entity.title = params.title || entity.title || "";
  entity.tags = params.tags || entity.tags || [];
  entity.description = params.description || entity.description || "";
  entity.questions = params.questions || entity.questions || [];
  entity.references = params.references || entity.references || [];
  entity.isRandom = params.isRandom || entity.isRandom || true;
};
