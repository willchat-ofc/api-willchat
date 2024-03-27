import { makeSaveMessageValidation } from "../../../src/main/factories/save-message/save-message-validations";
import { UserNameValidation } from "../../../src/presentation/helpers/validators/name-validation/name-validation";
import { RequiredFieldValidation } from "../../../src/presentation/helpers/validators/required-field-validation/required-field-validation";
import { ValidationComposite } from "../../../src/presentation/helpers/validators/validation-composite";
import type { Validation } from "../../../src/presentation/protocols/validation";

jest.mock("../../../src/presentation/helpers/validators/validation-composite");

describe("SaveKey Validation", () => {
  test("should call Validation composite with valid Validations", () => {
    makeSaveMessageValidation();
    const validations: Array<Validation> = [];

    for (const field of ["key", "message", "userId", "userName"]) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new UserNameValidation());

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
