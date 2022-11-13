import type {
  SaveMessage,
  SaveMessageInput,
} from "../../../../src/domain/usecase/save-message";
import { ChatEntity } from "../../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import type { MessagesEntity } from "../../../../src/infra/db/postgreSQL/entities/message-postgresql-entity";
import { SaveMessageController } from "../../../../src/presentation/controller/save-message/save-message";
import {
  badRequest,
  ok,
  serverError,
} from "../../../../src/presentation/helpers/http-helper";
import type { HttpRequest } from "../../../../src/presentation/protocols/http";
import type { Validation } from "../../../../src/presentation/protocols/validation";

const makeValidatorStub = (): Validation => {
  class ValidatorStub implements Validation {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public validate(input: any): Error {
      return;
    }
  }

  return new ValidatorStub();
};

const makeSaveMessageStub = (): SaveMessage => {
  class SaveMessageStub implements SaveMessage {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async save(data: SaveMessageInput): Promise<MessagesEntity> {
      return {
        id: "fake-key",
        userId: "fake-user-id",
        chat: new ChatEntity(),
        message: "Hello world!",
        userName: "Willian",
      };
    }
  }

  return new SaveMessageStub();
};

const makeSut = () => {
  const validator = makeValidatorStub();
  const saveMessage = makeSaveMessageStub();

  const sut = new SaveMessageController(validator, saveMessage);

  return {
    sut,
    validator,
    saveMessage,
  };
};

const fakeHttpRequest: HttpRequest = {
  body: {
    key: "fake-key",
    message: "Hello world!",
    userName: "Willian",
    userId: "fake-user-id",
  },
};

describe("SaveMessage Controller", () => {
  test("should return an Error if validator returns an Error", async () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, "validate").mockReturnValue(new Error());
    const request = await sut.handle(fakeHttpRequest);

    expect(request).toStrictEqual(badRequest(new Error()));
  });

  test("should call validator with correct values", async () => {
    const { sut, validator } = makeSut();
    const validateSpy = jest.spyOn(validator, "validate");
    await sut.handle(fakeHttpRequest);

    expect(validateSpy).toBeCalledWith(fakeHttpRequest.body);
  });

  test("should return serverError if validator throws", async () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, "validate").mockImplementationOnce(() => {
      throw new Error();
    });

    const request = await sut.handle(fakeHttpRequest);

    expect(request).toStrictEqual(serverError());
  });

  test("should return serverError if saveMessage throws", async () => {
    const { sut, saveMessage } = makeSut();
    jest.spyOn(saveMessage, "save").mockImplementationOnce(() => {
      throw new Error();
    });

    const request = await sut.handle(fakeHttpRequest);

    expect(request).toStrictEqual(serverError());
  });

  test("should call saveMessage with correct values", async () => {
    const { sut, saveMessage } = makeSut();
    const validateSpy = jest.spyOn(saveMessage, "save");
    await sut.handle(fakeHttpRequest);

    expect(validateSpy).toBeCalledWith({
      key: "fake-key",
      message: "Hello world!",
      userName: "Willian",
      userId: "fake-user-id",
    });
  });

  test("should return message if success", async () => {
    const { sut } = makeSut();
    const res = await sut.handle(fakeHttpRequest);

    expect(res).toStrictEqual(
      ok({
        id: "fake-key",
        userId: "fake-user-id",
        chat: new ChatEntity(),
        message: "Hello world!",
        userName: "Willian",
      })
    );
  });
});
