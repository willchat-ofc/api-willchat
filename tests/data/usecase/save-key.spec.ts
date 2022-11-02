import type {
  SaveKeyRepository,
  SaveKeyRepositoryInput,
} from "./../../../src/data/protocols/save-key-repository";
import { DbSaveKey } from "../../../src/data/usecase/save-key/save-key";
import type { GenerateKey } from "../../../src/data/protocols/generate-key";

const makeSaveKeyRepositoryStub = (): SaveKeyRepository => {
  class SaveKeyRepositoryStub implements SaveKeyRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async save(data: SaveKeyRepositoryInput): Promise<void> {
      return;
    }
  }

  return new SaveKeyRepositoryStub();
};

const makeGenerateKeyStub = (): GenerateKey => {
  class GenerateKeyStub implements GenerateKey {
    public generate(): string {
      return "key";
    }
  }

  return new GenerateKeyStub();
};

const makeSut = () => {
  const saveKeyRepository = makeSaveKeyRepositoryStub();
  const generateKey = makeGenerateKeyStub();

  const sut = new DbSaveKey(saveKeyRepository, generateKey);

  return {
    sut,
    saveKeyRepository,
    generateKey,
  };
};

const fakeData = {
  userId: "fake-user-id",
};

describe("DbSaveKey", () => {
  test("should provide correct values to save", async () => {
    const { sut, saveKeyRepository } = makeSut();
    const saveSpy = jest.spyOn(saveKeyRepository, "save");

    await sut.save(fakeData);

    expect(saveSpy).toBeCalledWith({
      key: "key",
      userId: "fake-user-id",
    });
  });

  test("should throw if saveKeyRepository throws", async () => {
    const { sut, saveKeyRepository } = makeSut();
    jest.spyOn(saveKeyRepository, "save").mockRejectedValue(new Error());

    const promise = sut.save(fakeData);

    await expect(promise).rejects.toThrow(new Error());
  });
});
