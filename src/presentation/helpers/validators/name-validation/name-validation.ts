import type { Validation } from "../../../protocols/validation";
import { InvalidParamError } from "../../../errors/invalid-param-error";

export class UserNameValidation implements Validation {
  public validate(input: any): Error {
    const MAX_LENGTH = 20;
    if (input.userName.length > MAX_LENGTH) {
      return new InvalidParamError("userName");
    }
  }
}
