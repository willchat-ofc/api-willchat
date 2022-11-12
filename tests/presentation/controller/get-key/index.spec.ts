import type {
  GetKey,
  GetKeyInput,
} from "../../../../src/domain/usecase/get-key";
import { ChatEntity } from "../../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import type { KeyEntity } from "../../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";
import { GetKeyController } from "../../../../src/presentation/controller/get-key";
import {
  badRequest,
  serverError,
} from "../../../../src/presentation/helpers/http-helper";
import type { DecodeJwt } from "../../../../src/presentation/protocols/decode-jwt";
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

const makeGetKeyStub = () => {
  class GetKeyStub implements GetKey {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async get(data: GetKeyInput): Promise<KeyEntity> {
      return {
        id: "fake-key",
        key: "123",
        userId: "fake-user-id",
        chat: new ChatEntity(),
      };
    }
  }

  return new GetKeyStub();
};

const makeSut = () => {
  const decodeJwt = makeDecodeJwtStub();
  const validator = makeValidatorStub();
  const getKey = makeGetKeyStub();
  const sut = new GetKeyController(validator, decodeJwt, getKey);

  return {
    sut,
    validator,
    decodeJwt,
    getKey,
  };
};

const fakeHttpRequest: HttpRequest = {
  header: {
    accesstoken: "fake-accesstoken",
  },
};

describe("GetKey Controller", () => {
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

    expect(decodeSpy).toBeCalledWith(fakeHttpRequest.header.accesstoken);
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

  test("should call getKey with correctly value", async () => {
    const { sut, getKey } = makeSut();
    const getSpy = jest.spyOn(getKey, "get");

    await sut.handle(fakeHttpRequest);

    expect(getSpy).toBeCalledWith({
      userId: "fake-account-id",
    });
  });
});
