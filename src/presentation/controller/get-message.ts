import { badRequest, serverError } from "../helpers/http-helper";
import type { Controller } from "../protocols/controller";
import type { HttpRequest, HttpResponse } from "../protocols/http";
import type { Validation } from "../protocols/validation";

export class GetMessageController implements Controller {
  public constructor(private readonly validator: Validation) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.params);
      if (error) return badRequest(error);
    } catch {
      return serverError();
    }
  }
}
