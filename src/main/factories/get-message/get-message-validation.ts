import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation/required-field-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import type { Validation } from "../../../presentation/protocols/validation";

export const makeGetMessageValidation = () => {
  const validations: Array<Validation> = [];

  for (const field of ["key"]) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};
