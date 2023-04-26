import type {
  DeleteMessage,
  DeleteMessageInput,
} from "../../../src/domain/usecase/delete-message";
import { DeleteMessageController } from "../../../src/presentation/controller/message/delete-message";
import { badRequest } from "../../../src/presentation/helpers/http-helper";
import type { HttpRequest } from "../../../src/presentation/protocols/http";
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

const makeDeleteMessageStub = () => {
  class DeleteMessageStub implements DeleteMessage {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async delete(data: DeleteMessageInput): Promise<void> {
      return;
    }
  }

  return new DeleteMessageStub();
};

const makeSut = () => {
  const validator = makeValidatorStub();
  const deleteMessage = makeDeleteMessageStub();
  const sut = new DeleteMessageController(validator, deleteMessage);

  return {
    sut,
    validator,
    deleteMessage,
  };
};

const fakeHttpRequest: HttpRequest = {
  header: {
    messageId: "fake-account-id",
    key: "fake-key",
  },
  body: {
    accountId: "fake-account-id",
  },
};

describe("DeleteKey Controller", () => {
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

    expect(validateSpy).toBeCalledWith(fakeHttpRequest.header);
  });

  test("should call deleteMessage with correct values", async () => {
    const { sut, deleteMessage } = makeSut();
    const deleteSpy = jest.spyOn(deleteMessage, "delete");

    await sut.handle(fakeHttpRequest);

    expect(deleteSpy).toBeCalledWith({
      key: fakeHttpRequest.header.key,
      messageId: fakeHttpRequest.header.messageId,
      accountId: fakeHttpRequest.body.accountId,
    });
  });
});
