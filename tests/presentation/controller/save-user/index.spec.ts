import type {
  SaveKey,
  SaveKeyInput,
} from "../../../../src/domain/usecase/save-key";
import { ChatEntity } from "../../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import type { KeyEntity } from "../../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";
import { SaveKeyController } from "../../../../src/presentation/controller/save-key";
import { InvalidParamError } from "../../../../src/presentation/errors/invalid-param-error";
import {
  badRequest,
  ok,
  serverError,
} from "../../../../src/presentation/helpers/http-helper";
import type { DecodeJwt } from "../../../../src/presentation/protocols/decode-jwt";
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

const makeDecodeJwtStub = (): DecodeJwt => {
  class DecodeJwtStub implements DecodeJwt {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public decode(jwt: string) {
      return {
        accountId: "fake-account-id",
        sub: "client",
        iat: 1667171037,
        exp: 1667171337,
      };
    }
  }

  return new DecodeJwtStub();
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
  const decodeJwt = makeDecodeJwtStub();
  const validator = makeValidatorStub();
  const saveKey = makeSaveKeyStub();
  const sut = new SaveKeyController(validator, decodeJwt, saveKey);

  return {
    sut,
    validator,
    decodeJwt,
    saveKey,
  };
};

const fakeHttpRequest = {
  body: {
    accessToken: "fake-accessToken",
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

    expect(validateSpy).toBeCalledWith(fakeHttpRequest.body);
  });

  test("should return serverError if decodeJwt throws", async () => {
    const { sut, decodeJwt } = makeSut();
    jest.spyOn(decodeJwt, "decode").mockImplementationOnce(() => {
      throw new Error();
    });

    const request = await sut.handle(fakeHttpRequest);

    expect(request).toStrictEqual(serverError());
  });

  test("should call decode with correct values", async () => {
    const { sut, decodeJwt } = makeSut();
    const decodeSpy = jest.spyOn(decodeJwt, "decode");
    await sut.handle(fakeHttpRequest);

    expect(decodeSpy).toBeCalledWith(fakeHttpRequest.body.accessToken);
  });

  test("should return serverError if validator throws", async () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, "validate").mockImplementationOnce(() => {
      throw new Error();
    });

    const request = await sut.handle(fakeHttpRequest);

    expect(request).toStrictEqual(serverError());
  });

  test("should return serverError if decode throws", async () => {
    const { sut, decodeJwt } = makeSut();
    jest.spyOn(decodeJwt, "decode").mockImplementationOnce(() => {
      throw new Error();
    });

    const request = await sut.handle(fakeHttpRequest);

    expect(request).toStrictEqual(serverError());
  });

  test("should return badRequest if accountId is not valid", async () => {
    const { sut, decodeJwt } = makeSut();
    jest.spyOn(decodeJwt, "decode").mockReturnValueOnce({});

    const request = await sut.handle(fakeHttpRequest);

    expect(request).toStrictEqual(
      badRequest(new InvalidParamError("accessToken"))
    );
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
