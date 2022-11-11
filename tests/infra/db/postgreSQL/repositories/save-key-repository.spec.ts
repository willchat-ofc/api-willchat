import { SaveKeyPostgreRepository } from "./../../../../../src/infra/db/postgreSQL/repositories/save-key-repository/index";
import { TestTypeormHelper } from "../mocks/postgre-test-helper";
import type { Repository } from "typeorm";
import { KeyEntity } from "../../../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";

const makeFakeRequest = {
  key: "123",
  userId: "12345",
};

describe("SaveKey Repository", () => {
  let connection: TestTypeormHelper;
  let keyRepository: Repository<KeyEntity>;

  beforeAll(async () => {
    connection = new TestTypeormHelper();
    await connection.setupTestDB();
    keyRepository = new SaveKeyPostgreRepository().getRepository(KeyEntity);
  });

  beforeEach(async () => {
    keyRepository.clear();
  });

  afterAll(async () => {
    await connection.teardownTestDB();
  });

  const makeSut = () => {
    const sut = new SaveKeyPostgreRepository();

    return {
      sut,
    };
  };

  test("should save the key", async () => {
    const { sut } = makeSut();
    await sut.save(makeFakeRequest);
    const data = await keyRepository.findOne({
      where: {
        userId: "12345",
      },
    });

    expect(data).toBeTruthy();
  });

  test("should save the chat", async () => {
    const { sut } = makeSut();
    await sut.save(makeFakeRequest);
    const data = await keyRepository.findOne({
      where: {
        userId: "12345",
      },
      relations: {
        chat: true,
      },
    });

    expect(data.chat).toBeTruthy();
  });

  test("should return void if user already exists", async () => {
    const { sut } = makeSut();
    await sut.save(makeFakeRequest);
    const res = await sut.save(makeFakeRequest);

    expect(res).not.toBeTruthy();
  });

  test("should return key if success", async () => {
    const { sut } = makeSut();
    const res = await sut.save(makeFakeRequest);

    expect(res).toStrictEqual(expect.objectContaining(makeFakeRequest));
  });
});
