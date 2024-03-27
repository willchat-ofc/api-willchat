import { RequiredFieldValidation } from "../../../src/presentation/helpers/validators/required-field-validation/required-field-validation";
import { ValidationComposite } from "../../../src/presentation/helpers/validators/validation-composite";
import type { Validation } from "../../../src/presentation/protocols/validation";
import { makeGetMessageValidation } from "../../../src/main/factories/get-message/get-message-validation";

jest.mock("../../../src/presentation/helpers/validators/validation-composite");

describe("GetKey Validation", () => {
  test("should call Validation composite with valid Validations", () => {
    makeGetMessageValidation();
    const validations: Array<Validation> = [];

    for (const field of ["key"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
