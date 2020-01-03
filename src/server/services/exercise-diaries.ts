import * as createError from "http-errors";
import { EntityManager } from "typeorm";
import { ExerciseDiaryEntryEntity, SubmissionEntity } from "../database/entities";
import { getSubmittedDateString } from "./submissions";

export const updateExerciseDiaryEntrySubmittedCount = async (params: {
  manager: EntityManager;
  submission: SubmissionEntity;
}) => {
  const { manager, submission } = params;
  const { exercise, typeCount } = submission;
  const submittedDate = getSubmittedDateString(submission);
  if (exercise === undefined) {
    throw createError(500, "submission.exercise is not defined");
  }

  const exerciseDiaryEntry = await manager.findOne(ExerciseDiaryEntryEntity, {
    exerciseId: exercise.id,
    date: submittedDate
  });

  if (exerciseDiaryEntry === undefined) {
    const newExerciseDiaryEntry = new ExerciseDiaryEntryEntity(exercise, submittedDate);

    newExerciseDiaryEntry.submittedCount += 1;
    newExerciseDiaryEntry.typedCount += typeCount;

    await manager.save(newExerciseDiaryEntry);

    return newExerciseDiaryEntry;
  } else {
    exerciseDiaryEntry.submittedCount += 1;
    exerciseDiaryEntry.typedCount += typeCount;

    await manager.save(exerciseDiaryEntry);

    return exerciseDiaryEntry;
  }
};
