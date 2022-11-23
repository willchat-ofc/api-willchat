import { RequiredFieldValidation } from "../../../src/presentation/helpers/validators/required-field-validation/required-field-validation";
import { ValidationComposite } from "../../../src/presentation/helpers/validators/validation-composite";
import type { Validation } from "../../../src/presentation/protocols/validation";
import { makeGetKeyValidation } from "../../../src/main/factories/get-key/get-key-validation";

jest.mock("../../../src/presentation/helpers/validators/validation-composite");

describe("GetKey Validation", () => {
  test("should call Validation composite with valid Validations", () => {
    makeGetKeyValidation();
    const validations: Array<Validation> = [];

    for (const field of ["accesstoken"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toBeCalledWith(validations);
  });
});
