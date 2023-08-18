import { RequiredFieldValidation } from "./../../../presentation/helpers/validators/required-field-validation/required-field-validation";
import type { Validation } from "../../../presentation/protocols/validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import { UserNameValidation } from "../../../presentation/helpers/validators/name-validation/name-validation";

export const makeSaveMessageValidation = () => {
  const validations: Array<Validation> = [];

  for (const field of ["key", "message", "userId", "userName"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new UserNameValidation());

  return new ValidationComposite(validations);
};
