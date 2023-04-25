import type { DeleteKeyRepository, DeleteKeyRepositoryInput } from "../../../src/data/protocols/delete-key-repository";
import { DbDeleteKey } from "../../../src/data/usecase/delete-key";
import type { DeleteKeyInput } from "../../../src/domain/usecase/delete-key";

const makeDeleteKeyRepository = (): DeleteKeyRepository =>  {
    class DeleteKeyRepositorySpy implements DeleteKeyRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        public delete(data: DeleteKeyRepositoryInput): Promise<void> {
            return;
        }
    }

    return new DeleteKeyRepositorySpy();
};

const makeSut = () => {
    const deleteKeyRepository = makeDeleteKeyRepository();
    const sut = new DbDeleteKey(deleteKeyRepository);

    return {
        sut,
        deleteKeyRepository,
    };
};

const fakeParams: DeleteKeyInput = {
    key: "fake_key",
    accountId: "fake_account_id",
};


describe("DbDeleteKey", () => {
    test("should call deleteKeyRepository with correct values", async () => {
        const { sut, deleteKeyRepository } = makeSut();
        const deleteSpy = jest.spyOn(deleteKeyRepository, "delete");
    
        await sut.delete(fakeParams);
    
        expect(deleteSpy).toBeCalledWith(fakeParams);
      });
    
      test("should throw if deleteKeyRepository throws", async () => {
        const { sut, deleteKeyRepository } = makeSut();
        jest.spyOn(deleteKeyRepository, "delete").mockRejectedValueOnce(new Error());
    
        const promise = sut.delete(fakeParams);
    
        await expect(promise).rejects.toThrow();
      });

      test("should return void if success", async () => {
        const { sut } = makeSut();
        const promise = await sut.delete(fakeParams);
    
        await expect(promise).not.toBeTruthy();
      });
});