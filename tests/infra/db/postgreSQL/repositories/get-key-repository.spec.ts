import type { Repository } from "typeorm";
import { ChatEntity } from "../../../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import { KeyEntity } from "../../../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";
import { GetKeyPostgreRepository } from "../../../../../src/infra/db/postgreSQL/repositories/get-key-repository";
import { TestTypeormHelper } from "../mocks/postgre-test-helper";

const makeSut = () => {
  const sut = new GetKeyPostgreRepository();

  return {
    sut,
  };
};

const makeFakeRequest = {
  userId: "fake-user-id",
};

describe("GetKey Repository", () => {
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
    fakeKey.userId = "fake-user-id";
    fakeKey.key = "fake-key";

    chatRepository = postgreRepository.getRepository(ChatEntity);
    await chatRepository.save(fakeChat);
    await keyRepository.save(fakeKey);
  });

  afterAll(async () => {
    await connection.teardownTestDB();
  });

  test("should return null if findOne return null", async () => {
    const { sut } = makeSut();
    const key = await sut.get({
      userId: "invalid-user-id",
    });

    expect(key).not.toBeTruthy();
  });

  test("should return the key if success", async () => {
    const { sut } = makeSut();
    const key = await sut.get(makeFakeRequest);

    expect(key.userId).toBe(makeFakeRequest.userId);
  });
});
