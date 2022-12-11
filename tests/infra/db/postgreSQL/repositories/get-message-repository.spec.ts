import type { Repository } from "typeorm";
import { ChatEntity } from "../../../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import { KeyEntity } from "../../../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";
import { MessagesEntity } from "../../../../../src/infra/db/postgreSQL/entities/message-postgresql-entity";
import { GetMessagePostgreRepository } from "../../../../../src/infra/db/postgreSQL/repositories/get-message-repository";
import { TestTypeormHelper } from "../mocks/postgre-test-helper";

const makeSut = () => {
  const sut = new GetMessagePostgreRepository();

  return {
    sut,
  };
};

describe("GetKey Repository", () => {
  let connection: TestTypeormHelper;
  let keyRepository: Repository<KeyEntity>;
  let chatRepository: Repository<ChatEntity>;
  let messageRepository: Repository<MessagesEntity>;

  beforeAll(async () => {
    connection = new TestTypeormHelper();
    await connection.setupTestDB();

    const postgreRepository = new GetMessagePostgreRepository();
    keyRepository = postgreRepository.getRepository(KeyEntity);

    const fakeChat = new ChatEntity();

    const fakeMessage = new MessagesEntity();
    fakeMessage.chat = fakeChat;
    fakeMessage.userId = "fake-user-id";
    fakeMessage.userName = "fake-user-name";
    fakeMessage.message = "hello world!";

    const fakeKey = new KeyEntity();
    fakeKey.chat = fakeChat;
    fakeKey.userId = "fake-user-id";
    fakeKey.key = "fake-key";

    chatRepository = postgreRepository.getRepository(ChatEntity);
    await chatRepository.save(fakeChat);

    messageRepository = postgreRepository.getRepository(MessagesEntity);
    await messageRepository.save(fakeMessage);

    await keyRepository.save(fakeKey);
  });

  afterAll(async () => {
    await connection.teardownTestDB();
  });

  test("should return message if success", async () => {
    const { sut } = makeSut();

    const res = await sut.get({
      key: "fake-key",
    });

    expect(res).toStrictEqual([
      expect.objectContaining({
        userId: "fake-user-id",
        userName: "fake-user-name",
        message: "hello world!",
      }),
    ]);
  });
});
