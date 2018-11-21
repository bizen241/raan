import { SearchResult } from "../../../../shared/api/response/search";
import { TestDatabase } from "../../../database/__tests__/helpers";
import { GET } from "../users";
import { createHttpMocks } from "./helpers";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
beforeEach(async () => {
  await testDatabase.reset();
});
afterAll(async () => {
  await testDatabase.close();
});

test("GET /users", async () => {
  const { req, res } = createHttpMocks("Guest");

  await GET(req, res, () => null);

  expect(res.statusCode).toEqual(200);

  const data = JSON.parse(res._getData()) as SearchResult;
  expect(data.ids).toBeDefined();
});