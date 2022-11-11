import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation/required-field-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import type { Validation } from "../../../presentation/protocols/validation";
import { makeSaveKeyValidation } from "./save-key-validation";

jest.mock("../../../presentation/helpers/validators/validation-composite");

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
