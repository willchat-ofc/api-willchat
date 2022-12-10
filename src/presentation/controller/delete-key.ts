import { badRequest } from "../helpers/http-helper";
import type { Controller } from "../protocols/controller";
import type { HttpRequest, HttpResponse } from "../protocols/http";
import type { Validation } from "../protocols/validation";

export class DeleteKeyController implements Controller {
  public constructor(private readonly validator: Validation) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.header);
    if (error) return badRequest(error);
  }
}
