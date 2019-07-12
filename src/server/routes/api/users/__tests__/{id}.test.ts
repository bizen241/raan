import { strict as assert } from "assert";
import { getManager } from "typeorm";
import { EntityStore } from "../../../../../shared/api/response/get";
import { createHttpMocks, insertUser, TestDatabase } from "../../../../__tests__/helpers";
import { PathParams } from "../../../../api/operation";
import { UserAccountEntity, UserConfigEntity, UserEntity } from "../../../../database/entities";
import { DELETE, GET } from "../{id}";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

beforeEach(async () => {
  await testDatabase.reset();
});

test("GET /api/users/{user} -> 200", async () => {
  const { req, res, next, user } = await createHttpMocks("Write");

  (req.params as PathParams) = {
    id: user.id
  };

  await GET(req, res, next);

  assert.equal(res._getStatusCode(), 200);

  const data = JSON.parse(res._getData()) as EntityStore;

  assert(data.User[user.id]);
});

test("GET /api/users/{user} -> 404", async () => {
  const { req, res, next, user } = await createHttpMocks("Write");

  (req.params as PathParams) = {
    id: user.id
  };

  await getManager().remove(user);
  await GET(req, res, next);

  assert.equal(res._getStatusCode(), 404);
});

test("DELETE /api/users/{user} requires Owner premission", async () => {
  assert(DELETE.apiDoc && DELETE.apiDoc.security && DELETE.apiDoc.security[0].Owner);
});

test("DELETE /api/users/{user} -> 200", async () => {
  const { req, res, next } = await createHttpMocks("Owner");
  const { user, account, config } = await insertUser("Write");

  (req.params as PathParams) = {
    id: user.id
  };

  const manager = getManager();

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 200);

  const deletedUser = await manager.findOne(UserEntity, user.id);
  const deletedAccount = await manager.findOne(UserAccountEntity, account.id);
  const deletedConfig = await manager.findOne(UserConfigEntity, config.id);

  assert.equal(deletedUser, undefined);
  assert.equal(deletedAccount, undefined);
  assert.equal(deletedConfig, undefined);
});

test("DELETE /api/users/{user} -> 404", async () => {
  const { req, res, next, user } = await createHttpMocks("Owner");

  (req.params as PathParams) = {
    id: user.id
  };

  await getManager().remove(user);
  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 404);
});

test("DELETE /api/users/{user} -> 403", async () => {
  const { req, res, next, user } = await createHttpMocks("Owner");

  (req.params as PathParams) = {
    id: user.id
  };

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 403);
});
