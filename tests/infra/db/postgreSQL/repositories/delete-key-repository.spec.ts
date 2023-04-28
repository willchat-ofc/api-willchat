import type { Repository } from "typeorm";

import type { DeleteKeyRepositoryInput } from "../../../../../src/data/protocols/delete-key-repository";
import { KeyEntity } from "../../../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";
import { DeleteKeyPostgreRepository } from "../../../../../src/infra/db/postgreSQL/repositories/delete-key-repository";
import { TestTypeormHelper } from "../mocks/postgre-test-helper";

const makeSut = () => {
  const sut = new DeleteKeyPostgreRepository();

  return {
    sut,
  };
};

const fakeRequest: DeleteKeyRepositoryInput = {
  accountId: "fake-user-id",
  key: "fake-key",
};

describe("GetKey Repository", () => {
  let connection: TestTypeormHelper;
  let keyRepository: Repository<KeyEntity>;

  beforeAll(async () => {
    connection = new TestTypeormHelper();
    await connection.setupTestDB();

    const postgreRepository = new DeleteKeyPostgreRepository();
    keyRepository = postgreRepository.getRepository(KeyEntity);
  });

  beforeEach(async () => {
    const fakeKey = new KeyEntity();
    fakeKey.userId = "fake-user-id";
    fakeKey.key = "fake-key";

    await keyRepository.save(fakeKey);
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

    const key = await keyRepository.find({
      where: {
        key: fakeRequest.key,
      },
    });

    expect(key).toHaveLength(0);
  });
});
