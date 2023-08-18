import { InvalidParamError } from "../../../../src/presentation/errors/invalid-param-error";
import { NameValidation } from "../../../../src/presentation/helpers/validators/name-validation/name-validation";

const makeSut = () => {
  const sut = new NameValidation();

  return {
    sut,
  };
};

describe("Name validation", () => {
  test("should return MissingParamError if userName is invalid", () => {
    const { sut } = makeSut();
    const res = sut.validate({
      userName: "THIS_NAME_HAS_MORE_THAN_TWENTY_CHARACTERS",
    });

    expect(res).toStrictEqual(new InvalidParamError("userName"));
  });
});
