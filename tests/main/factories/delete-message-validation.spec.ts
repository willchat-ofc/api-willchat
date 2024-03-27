import { makeDeleteMessageValidation } from "../../../src/main/factories/delete-message/delete-message-validation";
import { RequiredFieldValidation } from "../../../src/presentation/helpers/validators/required-field-validation/required-field-validation";
import { ValidationComposite } from "../../../src/presentation/helpers/validators/validation-composite";
import type { Validation } from "../../../src/presentation/protocols/validation";

jest.mock("../../../src/presentation/helpers/validators/validation-composite");

describe("DeleteKey Validation", () => {
  test("should call Validation composite with valid Validations", () => {
    makeDeleteMessageValidation();
    const validations: Array<Validation> = [];

    for (const field of ["key", "messageid"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
