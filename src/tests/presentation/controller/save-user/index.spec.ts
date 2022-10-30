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
});
