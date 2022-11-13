import { TestTypeormHelper } from "./../../infra/db/postgreSQL/mocks/postgre-test-helper";
import request from "supertest";
import app from "../../../src/main/config/app";
import jwt from "jsonwebtoken";
import { env } from "../../../src/main/config/env";

describe("GetKey Router", () => {
  let connection: TestTypeormHelper;

  beforeAll(async () => {
    connection = new TestTypeormHelper();
    await connection.setupTestDB();
  });

  afterAll(async () => {
    await connection.teardownTestDB();
  });

  test("should return key if success", async () => {
    const token = jwt.sign(
      {
        accountId: "fake-account-id",
      },
      env.secret
    );

    const response = await request(app).post("/key").set({
      accesstoken: token,
    });

    expect(response.body).toStrictEqual(
      expect.objectContaining({
        userId: "fake-account-id",
      })
    );
    expect(response.statusCode).toBe(200);
  });
});
