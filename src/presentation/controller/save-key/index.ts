import { badRequest } from "../../helpers/http-helper";
import type { Validation } from "../../protocols/validation";
import type { HttpRequest, HttpResponse } from "../../protocols/http";
import type { Controller } from "../../protocols/controller";

export class SaveKeyController implements Controller {
  public constructor(private readonly validator: Validation) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body);
    if (error) return badRequest(error);
  }
}
