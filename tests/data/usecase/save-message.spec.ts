import type {
  SaveMessageRepository,
  SaveMessageRepositoryInput,
} from "../../../src/data/protocols/save-message-repository";
import { DbSaveMessage } from "../../../src/data/usecase/save-message/save-message";
import type { SaveMessageInput } from "../../../src/domain/usecase/save-message";
import { ChatEntity } from "../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import type { MessagesEntity } from "../../../src/infra/db/postgreSQL/entities/message-postgresql-entity";

const makeSaveMessageRepositoryStub = () => {
  class SaveMessageRepositoryStub implements SaveMessageRepository {
    public async save(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      data: SaveMessageRepositoryInput
    ): Promise<MessagesEntity> {
      return {
        id: "fake-key",
        userId: "fake-user-id",
        chat: new ChatEntity(),
        message: "Hello world!",
        userName: "Willian",
      };
    }
  }

  return new SaveMessageRepositoryStub();
};

const makeSut = () => {
  const saveMessageRepository = makeSaveMessageRepositoryStub();
  const sut = new DbSaveMessage(saveMessageRepository);

  return {
    sut,
    saveMessageRepository,
  };
};

const makeFakeRequest: SaveMessageInput = {
  userId: "fake-user-id",
  message: "Hello world!",
  userName: "Willian",
  key: "fake-key",
};

describe("DbSaveMessage", () => {
  test("should call saveMessageRepository with correct values", async () => {
    const { sut, saveMessageRepository } = makeSut();
    const saveSpy = jest.spyOn(saveMessageRepository, "save");

    await sut.save(makeFakeRequest);

    expect(saveSpy).toBeCalledWith({
      userId: "fake-user-id",
      message: "Hello world!",
      userName: "Willian",
      key: "fake-key",
    });
  });

  test("should return message if success", async () => {
    const { sut } = makeSut();

    const res = await sut.save(makeFakeRequest);

    expect(res).toStrictEqual({
      id: "fake-key",
      userId: "fake-user-id",
      chat: new ChatEntity(),
      message: "Hello world!",
      userName: "Willian",
    });
  });
});
