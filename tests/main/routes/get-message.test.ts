import { TestTypeormHelper } from "./../../infra/db/postgreSQL/mocks/postgre-test-helper";
import request from "supertest";
import app from "../../../src/main/config/app";
import { KeyEntity } from "../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";
import type { Repository } from "typeorm";
import { ChatEntity } from "../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import { MessagesEntity } from "../../../src/infra/db/postgreSQL/entities/message-postgresql-entity";
import { GetMessagePostgreRepository } from "../../../src/infra/db/postgreSQL/repositories/get-message-repository";

describe("GetMessage Router", () => {
  let connection: TestTypeormHelper;
  let keyRepository: Repository<KeyEntity>;
  let chatRepository: Repository<ChatEntity>;
  let messageRepository: Repository<MessagesEntity>;
  let key: string;

  beforeAll(async () => {
    connection = new TestTypeormHelper();
    await connection.setupTestDB();

    const postgreRepository = new GetMessagePostgreRepository();
    keyRepository = postgreRepository.getRepository(KeyEntity);

    const fakeChat = new ChatEntity();
    const fakeKey = new KeyEntity();
    fakeKey.chat = fakeChat;
    fakeKey.userId = "fake-account-id";
    fakeKey.key = "fake-key";

    chatRepository = postgreRepository.getRepository(ChatEntity);
    await chatRepository.save(fakeChat);
    key = (await keyRepository.save(fakeKey)).key;

    const fakeMessage = new MessagesEntity();
    fakeMessage.chat = fakeChat;
    fakeMessage.message = "fake-message";
    fakeMessage.userId = "fake-user-id";
    fakeMessage.userName = "fake-user-name";

    messageRepository = postgreRepository.getRepository(MessagesEntity);
    await messageRepository.save(fakeMessage);
  });

  afterAll(async () => {
    await connection.teardownTestDB();
  });

  test("should return key if success", async () => {
    const response = await request(app).get(`/key/message/${key}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([
      expect.objectContaining({
        message: "fake-message",
        userId: "fake-user-id",
        userName: "fake-user-name",
      }),
    ]);
  });
});
