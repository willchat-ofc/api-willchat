import { SaveUserController } from "../../../../presentation/controller/save-user";
import { badRequest } from "../../../../presentation/helpers/http-helper";
import type { Validation } from "../../../../presentation/protocols/validation";

const makeValidatorSut = (): Validation => {
  class Validator implements Validation {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public validate(input: any): Error {
      return;
    }
  }

  return new Validator();
};

const makeSut = () => {
  const validator = makeValidatorSut();
  const sut = new SaveUserController(validator);

  return {
    sut,
    validator,
  };
};

const fakeHttpRequest = {
  body: {
    accessToken: "fake-accessToken",
  },
};

describe("SaveUser Controller", () => {
  test("ensure return Error if validator returns an Error", async () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, "validate").mockReturnValue(new Error());
    const request = await sut.handle(fakeHttpRequest);

    expect(request).toStrictEqual(badRequest(new Error()));
  });
});
