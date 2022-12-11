import type {
  DeleteKey,
  DeleteKeyInput,
} from "../../../src/domain/usecase/delete-key";
import { DeleteKeyController } from "../../../src/presentation/controller/delete-key";
import {
  badRequest,
  serverError,
} from "../../../src/presentation/helpers/http-helper";
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

const makeDeleteKeyStub = (): DeleteKey => {
  class DeleteKeyStub implements DeleteKey {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async delete(data: DeleteKeyInput): Promise<void> {
      return;
    }
  }

  return new DeleteKeyStub();
};

const makeSut = () => {
  const validator = makeValidatorStub();
  const deleteKey = makeDeleteKeyStub();
  const sut = new DeleteKeyController(validator, deleteKey);

  return {
    sut,
    validator,
    deleteKey,
  };
};

const fakeHttpRequest: HttpRequest = {
  body: {
    key: "fake-key",
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

    expect(validateSpy).toBeCalledWith(fakeHttpRequest.body);
  });

  test("should return serverError if validator throws", async () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, "validate").mockImplementationOnce(() => {
      throw new Error();
    });

    const res = await sut.handle(fakeHttpRequest);

    expect(res).toStrictEqual(serverError());
  });

  test("should call deleteKey with correct values", async () => {
    const { sut, deleteKey } = makeSut();
    const deleteSpy = jest.spyOn(deleteKey, "delete");

    await sut.handle(fakeHttpRequest);

    expect(deleteSpy).toBeCalledWith(fakeHttpRequest.body);
  });
});
