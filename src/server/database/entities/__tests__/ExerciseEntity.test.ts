import { getManager } from "typeorm";
import { TestDatabase } from "../../__tests__/helpers";
import { ExerciseEntity } from "../ExerciseEntity";
import { insertExercise } from "./helpers";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

test("ExerciseEntity", async () => {
  await insertExercise();

  const contents = await getManager().find(ExerciseEntity);

  expect(contents.length).toBe(1);
});