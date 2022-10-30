import type { Validation } from "./../../protocols/validation";

export class ValidationComposite implements Validation {
  public constructor(private readonly validation: Array<Validation>) {}

  public validate(input: any): Error | null {
    for (const validation of input) {
      const error = validation.validate(input);
      if (error) return error;
    }
  }
}
