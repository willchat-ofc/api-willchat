import { RequiredFieldValidation } from "../../../src/presentation/helpers/validators/required-field-validation/required-field-validation";
import { ValidationComposite } from "../../../src/presentation/helpers/validators/validation-composite";
import type { Validation } from "../../../src/presentation/protocols/validation";
import { makeSaveKeyValidation } from "../../../src/main/factories/save-key/save-key-validation";

jest.mock("../../../src/presentation/helpers/validators/validation-composite");

describe("SaveKey Validation", () => {
  test("should call Validation composite with valid Validations", () => {
    makeSaveKeyValidation();
    const validations: Array<Validation> = [];

    for (const field of ["accesstoken"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toBeCalledWith(validations);
  });
});
