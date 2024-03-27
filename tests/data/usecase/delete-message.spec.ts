import type {
  DeleteMessageRepository,
  DeleteMessageRepositoryInput,
} from "../../../src/data/protocols/delete-message-repository";
import { DbDeleteMessage } from "../../../src/data/usecase/delete-message";
import type { DeleteMessageInput } from "../../../src/domain/usecase/delete-message";

const makeDeleteMessageRepository = (): DeleteMessageRepository => {
  class DeleteMessageRepositorySpy implements DeleteMessageRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public delete(data: DeleteMessageRepositoryInput): Promise<void> {
      return;
    }
  }

  return new DeleteMessageRepositorySpy();
};

const makeSut = () => {
  const deleteMessageRepository = makeDeleteMessageRepository();
  const sut = new DbDeleteMessage(deleteMessageRepository);

  return {
    sut,
    deleteMessageRepository,
  };
};

const fakeParams: DeleteMessageInput = {
  key: "fake_key",
  accountId: "fake_account_id",
  messageId: "fake_message_id",
};

describe("DbDeleteKey", () => {
  test("should call deleteMessageRepository with correct values", async () => {
    const { sut, deleteMessageRepository } = makeSut();
    const deleteSpy = jest.spyOn(deleteMessageRepository, "delete");

    await sut.delete(fakeParams);

    expect(deleteSpy).toHaveBeenCalledWith(fakeParams);
  });

  test("should throw if deleteMessageRepository throws", async () => {
    const { sut, deleteMessageRepository } = makeSut();
    jest
      .spyOn(deleteMessageRepository, "delete")
      .mockRejectedValueOnce(new Error());

    const promise = sut.delete(fakeParams);

    await expect(promise).rejects.toThrow();
  });

  test("should return void if success", async () => {
    const { sut } = makeSut();
    const promise = await sut.delete(fakeParams);

    await expect(promise).not.toBeTruthy();
  });
});
