import { SaveKeyController } from "../../../../presentation/controller/save-key";
import {
  badRequest,
  serverError,
} from "../../../../presentation/helpers/http-helper";
import type { DecodeJwt } from "../../../../presentation/protocols/decode-jwt";
import type { Validation } from "../../../../presentation/protocols/validation";

const makeValidatorSut = (): Validation => {
  class ValidatorStub implements Validation {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public validate(input: any): Error {
      return;
    }
  }

  return new ValidatorStub();
};

const makeDecodeJwt = (): DecodeJwt => {
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

const makeSut = () => {
  const decodeJwt = makeDecodeJwt();
  const validator = makeValidatorSut();
  const sut = new SaveKeyController(validator, decodeJwt);

  return {
    sut,
    validator,
    decodeJwt,
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

  test("should return an Error if validator is not called with valid values", async () => {
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
});
