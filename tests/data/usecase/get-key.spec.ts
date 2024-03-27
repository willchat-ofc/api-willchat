import type {
  GetKeyRepository,
  GetKeyRepositoryInput,
} from "../../../src/data/protocols/get-key-repository";
import { DbGetKey } from "../../../src/data/usecase/get-key";
import type { GetKeyInput } from "../../../src/domain/usecase/get-key";
import { ChatEntity } from "../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import type { KeyEntity } from "../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";

const makeGetKeyRepositoryStub = (): GetKeyRepository => {
  class GetKeyRepositoryStub implements GetKeyRepository {
    public async get(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      data: GetKeyRepositoryInput
    ): Promise<Array<KeyEntity>> {
      return [
        {
          chat: new ChatEntity(),
          userId: "fake-user-id",
          id: "fake-id",
          key: "fake-key",
        },
      ];
    }
  }

  return new GetKeyRepositoryStub();
};

const makeSut = () => {
  const getKeyRepository = makeGetKeyRepositoryStub();
  const sut = new DbGetKey(getKeyRepository);

  return {
    sut,
    getKeyRepository,
  };
};

const fakeParams: GetKeyInput = {
  userId: "fake-user-id",
};

describe("GetKey Database", () => {
  test("should call GetKeyRepository with correct values", async () => {
    const { sut, getKeyRepository } = makeSut();
    const getSpy = jest.spyOn(getKeyRepository, "get");

    await sut.get(fakeParams);

    expect(getSpy).toHaveBeenCalledWith(fakeParams);
  });

  test("should throw if GetKeyRepository throws", async () => {
    const { sut, getKeyRepository } = makeSut();
    jest.spyOn(getKeyRepository, "get").mockRejectedValueOnce(new Error());

    const promise = sut.get(fakeParams);

    await expect(promise).rejects.toThrow();
  });

  test("should return array of message if success", async () => {
    const { sut } = makeSut();
    const res = await sut.get(fakeParams);

    expect(res).toStrictEqual([
      {
        chat: new ChatEntity(),
        userId: "fake-user-id",
        id: "fake-id",
        key: "fake-key",
      },
    ]);
  });
});
