import { RequiredFieldValidation } from "../../../src/presentation/helpers/validators/required-field-validation/required-field-validation";
import { ValidationComposite } from "../../../src/presentation/helpers/validators/validation-composite";
import type { Validation } from "../../../src/presentation/protocols/validation";
import { makeDeleteKeyValidation } from "../../../src/main/factories/delete-key/delete-key-validation";

jest.mock("../../../src/presentation/helpers/validators/validation-composite");

describe("DeleteKey Validation", () => {
  test("should call Validation composite with valid Validations", () => {
    makeDeleteKeyValidation();
    const validations: Array<Validation> = [];

    for (const field of ["key"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toBeCalledWith(validations);
  });
});
