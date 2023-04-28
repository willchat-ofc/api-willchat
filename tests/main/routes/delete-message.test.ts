import { TestTypeormHelper } from "./../../infra/db/postgreSQL/mocks/postgre-test-helper";
import request from "supertest";
import app from "../../../src/main/config/app";
import jwt from "jsonwebtoken";
import { env } from "../../../src/main/config/env";
import { KeyEntity } from "../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";
import type { Repository } from "typeorm";
import { ChatEntity } from "../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import { MessagesEntity } from "../../../src/infra/db/postgreSQL/entities/message-postgresql-entity";
import { DeleteMessagePostgreRepository } from "../../../src/infra/db/postgreSQL/repositories/delete-message-repository";

describe("DeleteMessage Router", () => {
  let connection: TestTypeormHelper;
  let keyRepository: Repository<KeyEntity>;
  let chatRepository: Repository<ChatEntity>;
  let messagesRepository: Repository<MessagesEntity>;

  beforeAll(async () => {
    connection = new TestTypeormHelper();
    await connection.setupTestDB();

    const postgreRepository = new DeleteMessagePostgreRepository();

    const fakeChat = new ChatEntity();
    const fakeKey = new KeyEntity();
    fakeKey.chat = fakeChat;
    fakeKey.userId = "fake-account-id";
    fakeKey.key = "fake-key";

    keyRepository = postgreRepository.getRepository(KeyEntity);
    chatRepository = postgreRepository.getRepository(ChatEntity);
    messagesRepository = postgreRepository.getRepository(MessagesEntity);

    await keyRepository.save(fakeKey);
    await chatRepository.save(fakeChat);
    await messagesRepository.save({
      chat: fakeKey.chat,
      id: "fake-message-id",
      message: "Hello everyone!",
      userId: "fake-user-id",
      userName: "fake-user-name",
    });
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

    const response = await request(app).delete("/key/message").set({
      accesstoken: token,
      key: "fake-key",
      messageid: "fake-message-id",
    });

    const exitsMessage = await messagesRepository.findOneBy({
      id: "fake-message-id",
    });
    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(exitsMessage).not.toBeTruthy();
  });
});
