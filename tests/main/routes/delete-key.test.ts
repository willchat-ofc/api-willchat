import { TestTypeormHelper } from "./../../infra/db/postgreSQL/mocks/postgre-test-helper";
import request from "supertest";
import app from "../../../src/main/config/app";
import jwt from "jsonwebtoken";
import { env } from "../../../src/main/config/env";
import { KeyEntity } from "../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";
import type { Repository } from "typeorm";
import { ChatEntity } from "../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import { GetKeyPostgreRepository } from "../../../src/infra/db/postgreSQL/repositories/get-key-repository";

describe("GetKey Router", () => {
  let connection: TestTypeormHelper;
  let keyRepository: Repository<KeyEntity>;
  let chatRepository: Repository<ChatEntity>;

  beforeAll(async () => {
    connection = new TestTypeormHelper();
    await connection.setupTestDB();

    const postgreRepository = new GetKeyPostgreRepository();
    keyRepository = postgreRepository.getRepository(KeyEntity);

    const fakeChat = new ChatEntity();
    const fakeKey = new KeyEntity();
    fakeKey.chat = fakeChat;
    fakeKey.userId = "fake-account-id";
    fakeKey.key = "fake-key";

    chatRepository = postgreRepository.getRepository(ChatEntity);
    await chatRepository.save(fakeChat);
    await keyRepository.save(fakeKey);
  });

  afterAll(async () => {
    await connection.teardownTestDB();
  });

  test("should return void if success", async () => {
    const token = jwt.sign(
      {
        accountId: "fake-account-id",
      },
      env.secret
    );

    const response = await request(app).delete("/key").set({
      accesstoken: token,
      key: "fake-key",
    });
    const exitsKey = await keyRepository.find({
      where: {
        key: "fake-key",
        userId: "fake-account-id",
      },
    });

    expect(exitsKey).toHaveLength(0);
    expect(response.statusCode).toBe(200);
  });
});
