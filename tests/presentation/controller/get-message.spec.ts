import type {
  GetMessage,
  GetMessageInput,
} from "../../../src/domain/usecase/get-message";
import { ChatEntity } from "../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import type { MessagesEntity } from "../../../src/infra/db/postgreSQL/entities/message-postgresql-entity";
import { GetMessageController } from "../../../src/presentation/controller/get-message";
import {
  badRequest,
  serverError,
} from "../../../src/presentation/helpers/http-helper";
import type { Validation } from "../../../src/presentation/protocols/validation";

const makeValidatorStub = (): Validation => {
  class ValidatorStub implements Validation {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public validate(input: any): Error {
      return;
    }
  }

  return new ValidatorStub();
};

const makeGetMessageStub = () => {
  class GetMessageStub implements GetMessage {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async get(data: GetMessageInput): Promise<Array<MessagesEntity>> {
      return [
        {
          id: "fake-key",
          userId: "fake-user-id",
          chat: new ChatEntity(),
          message: "Hello world!",
          userName: "Willian",
        },
      ];
    }
  }
  return new GetMessageStub();
};

const makeSut = () => {
  const validator = makeValidatorStub();
  const getMessage = makeGetMessageStub();
  const sut = new GetMessageController(validator, getMessage);

  return {
    sut,
    validator,
    getMessage,
  };
};

const fakeHttpRequest = {
  params: {
    key: "fake-key",
  },
};

describe("GetMessage Controller", () => {
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

    expect(validateSpy).toBeCalledWith(fakeHttpRequest.params);
  });

  test("should return serverError if validator throws", async () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, "validate").mockImplementationOnce(() => {
      throw new Error();
    });

    const res = await sut.handle(fakeHttpRequest);

    expect(res).toStrictEqual(serverError());
  });

  test("should call getMessage with valid values", async () => {
    const { sut, getMessage } = makeSut();
    const getSpy = jest.spyOn(getMessage, "get");

    await sut.handle(fakeHttpRequest);

    expect(getSpy).toBeCalledWith({
      key: fakeHttpRequest.params.key,
    });
  });

  test("should return serverError if getMessage throws", async () => {
    const { sut, getMessage } = makeSut();
    jest.spyOn(getMessage, "get").mockRejectedValueOnce(new Error());

    const res = await sut.handle(fakeHttpRequest);

    expect(res).toStrictEqual(serverError());
  });
});
