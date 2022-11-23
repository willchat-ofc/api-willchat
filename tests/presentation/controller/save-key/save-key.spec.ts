import type {
  SaveKey,
  SaveKeyInput,
} from "../../../../src/domain/usecase/save-key";
import { ChatEntity } from "../../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import type { KeyEntity } from "../../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";
import { SaveKeyController } from "../../../../src/presentation/controller/save-key/save-key";
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

const makeSaveKeyStub = (): SaveKey => {
  class SaveKeyStub implements SaveKey {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async save(data: SaveKeyInput): Promise<KeyEntity | void> {
      return {
        id: "fake-key",
        key: "123",
        userId: "12345",
        chat: new ChatEntity(),
      };
    }
  }

  return new SaveKeyStub();
};

const makeSut = () => {
  const validator = makeValidatorStub();
  const saveKey = makeSaveKeyStub();
  const sut = new SaveKeyController(validator, saveKey);

  return {
    sut,
    validator,
    saveKey,
  };
};

const fakeHttpRequest: HttpRequest = {
  header: {
    accesstoken: "fake-accesstoken",
  },
  body: {
    accountId: "fake-account-id",
  },
};

describe("SaveKey Controller", () => {
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

  test("should return serverError if validator throws", async () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, "validate").mockImplementationOnce(() => {
      throw new Error();
    });

    const request = await sut.handle(fakeHttpRequest);

    expect(request).toStrictEqual(serverError());
  });

  test("should return serverError if saveKey throws", async () => {
    const { sut, saveKey } = makeSut();
    jest.spyOn(saveKey, "save").mockRejectedValueOnce(new Error());
    const request = await sut.handle(fakeHttpRequest);

    expect(request).toStrictEqual(serverError());
  });

  test("should call saveKey with correct values", async () => {
    const { sut, saveKey } = makeSut();
    const decodeSpy = jest.spyOn(saveKey, "save");
    await sut.handle(fakeHttpRequest);

    expect(decodeSpy).toBeCalledWith({
      userId: "fake-account-id",
    });
  });

  test("should return badRequest if saveKey returns void", async () => {
    const { sut, saveKey } = makeSut();
    const decodeSpy = jest
      .spyOn(saveKey, "save")
      .mockRejectedValueOnce(undefined);
    await sut.handle(fakeHttpRequest);

    expect(decodeSpy).toBeCalledWith({
      userId: "fake-account-id",
    });
  });

  test("should return key if success", async () => {
    const { sut } = makeSut();
    const res = await sut.handle(fakeHttpRequest);

    expect(res).toStrictEqual(
      ok({
        id: "fake-key",
        key: "123",
        userId: "12345",
        chat: new ChatEntity(),
      })
    );
  });
});
