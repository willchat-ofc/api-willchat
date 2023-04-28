import type { Repository } from "typeorm";

import { ChatEntity } from "../../../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import { KeyEntity } from "../../../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";
import { TestTypeormHelper } from "../mocks/postgre-test-helper";
import type { DeleteMessageRepositoryInput } from "../../../../../src/data/protocols/delete-message-repository";
import { DeleteMessagePostgreRepository } from "../../../../../src/infra/db/postgreSQL/repositories/delete-message-repository";
import { MessagesEntity } from "../../../../../src/infra/db/postgreSQL/entities/message-postgresql-entity";

const makeSut = () => {
  const sut = new DeleteMessagePostgreRepository();

  return {
    sut,
  };
};

const fakeRequest: DeleteMessageRepositoryInput = {
  key: "fake_key",
  accountId: "fake_account_id",
  messageId: "fake_message_id",
};

describe("GetKey Repository", () => {
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
    fakeKey.userId = "fake_account_id";
    fakeKey.key = "fake_key";

    keyRepository = postgreRepository.getRepository(KeyEntity);
    chatRepository = postgreRepository.getRepository(ChatEntity);
    messagesRepository = postgreRepository.getRepository(MessagesEntity);

    await keyRepository.save(fakeKey);
    await chatRepository.save(fakeChat);
  });

  beforeEach(async () => {
    const key = await keyRepository.findOne({
      where: {
        key: fakeRequest.key,
      },
    });

    await messagesRepository.save({
      chat: key.chat,
      id: "fake_message_id",
      message: "Hello everyone!",
      userId: "fake-user-id",
      userName: "fake-user-name",
    });
  });

  afterAll(async () => {
    await connection.teardownTestDB();
  });

  test("should return null if success", async () => {
    const { sut } = makeSut();
    const key = await sut.delete(fakeRequest);

    expect(key).not.toBeTruthy();
  });

  test("should delete fake-key", async () => {
    const { sut } = makeSut();

    await sut.delete(fakeRequest);

    const messages = await messagesRepository.find({
      where: {
        id: fakeRequest.messageId,
      },
    });

    expect(messages).toHaveLength(0);
  });
});
