import { TestTypeormHelper } from "./../../infra/db/postgreSQL/mocks/postgre-test-helper";
import request from "supertest";
import app from "../../../src/main/config/app";
import { KeyEntity } from "../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";
import { GetKeyPostgreRepository } from "../../../src/infra/db/postgreSQL/repositories/get-key-repository";
import type { Repository } from "typeorm";
import { ChatEntity } from "../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";

describe("SaveMessage Router", () => {
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

  test("should return message if success", async () => {
    const response = await request(app).post("/key/message").send({
      key: "fake-key",
      message: "Hello world!",
      userName: "Willian",
      userId: "fake-user-id",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(
      expect.objectContaining({
        message: "Hello world!",
        userId: "fake-user-id",
        userName: "Willian",
      })
    );
  });
});
