import type { SaveMessageInput } from "./../../../../../src/domain/usecase/save-message";
import type { Repository } from "typeorm";
import { KeyEntity } from "../../../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";
import { MessagesEntity } from "../../../../../src/infra/db/postgreSQL/entities/message-postgresql-entity";
import { SaveMessagePostgreRepository } from "../../../../../src/infra/db/postgreSQL/repositories/save-message-repository";
import { TestTypeormHelper } from "../mocks/postgre-test-helper";
import { ChatEntity } from "../../../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";

const makeSut = () => {
  const sut = new SaveMessagePostgreRepository();

  return {
    sut,
  };
};

const makeFakeData: SaveMessageInput = {
  key: "fake-key",
  message: "fake-message",
  userId: "fake-user-id",
  userName: "fake-user-name",
  accountId: "fake-account-id",
};

describe("SaveMessage Repository", () => {
  let connection: TestTypeormHelper;
  let keyRepository: Repository<KeyEntity>;
  let messageRepository: Repository<MessagesEntity>;
  let chatRepository: Repository<ChatEntity>;

  beforeAll(async () => {
    connection = new TestTypeormHelper();
    await connection.setupTestDB();

    const fakeChat = new ChatEntity();
    const fakeKey = new KeyEntity();
    fakeKey.chat = fakeChat;
    fakeKey.userId = "fake-account-id";
    fakeKey.key = "fake-key";

    const postgreRepository = new SaveMessagePostgreRepository();
    keyRepository = postgreRepository.getRepository(KeyEntity);
    chatRepository = postgreRepository.getRepository(ChatEntity);
    await chatRepository.save(fakeChat);
    await keyRepository.save(fakeKey);
    messageRepository = postgreRepository.getRepository(MessagesEntity);
  });

  afterAll(async () => {
    await connection.teardownTestDB();
  });

  test("ensure message is saved if success", async () => {
    const { sut } = makeSut();
    const res = await sut.save(makeFakeData);

    const message = await messageRepository.findOne({
      where: {
        id: res.id,
      },
    });

    expect(message).toBeTruthy();
  });

  test("ensure return null if accountId is not found", async () => {
    const { sut } = makeSut();
    const res = await sut.save({
      ...makeFakeData,
      accountId: "invalid-account-id",
    });

    expect(res).not.toBeTruthy();
  });

  test("ensure return null if key is not found", async () => {
    const { sut } = makeSut();
    const res = await sut.save({
      ...makeFakeData,
      key: "invalid-key",
    });

    expect(res).not.toBeTruthy();
  });
});
