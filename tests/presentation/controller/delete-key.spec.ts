import { DeleteKeyController } from "../../../src/presentation/controller/delete-key";
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

const makeSut = () => {
  const validator = makeValidatorStub();
  const sut = new DeleteKeyController(validator);

  return {
    sut,
    validator,
  };
};

const fakeHttpRequest: HttpRequest = {
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
});
