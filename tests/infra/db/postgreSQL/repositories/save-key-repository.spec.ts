import { SaveKeyPostgreRepository } from "./../../../../../src/infra/db/postgreSQL/repositories/save-key-repository/index";
import { TestTypeormHelper } from "../mocks/postgre-test-helper";
import type { Repository } from "typeorm";
import { KeyEntity } from "../../../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";

describe("SaveKey Repository", () => {
  let connection: TestTypeormHelper;
  let keyRepository: Repository<KeyEntity>;

  beforeAll(async () => {
    connection = new TestTypeormHelper();
    await connection.setupTestDB();
    keyRepository = new SaveKeyPostgreRepository().getRepository(KeyEntity);
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

    await sut.save({
      key: "123",
      userId: "12345",
    });

    const data = await keyRepository.findOne({
      where: {
        userId: "12345",
      },
    });

    expect(data).toBeTruthy();
  });

  test("should save the chat", async () => {
    const { sut } = makeSut();

    await sut.save({
      key: "123",
      userId: "12345",
    });

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
});
