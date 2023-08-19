import type { GetMessage } from "../../../domain/usecase/get-message";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import type { Controller } from "../../protocols/controller";
import type { HttpRequest, HttpResponse } from "../../protocols/http";
import type { Validation } from "../../protocols/validation";

export class GetMessageController implements Controller {
  public constructor(
    private readonly validator: Validation,
    private readonly getMessage: GetMessage
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.params);
      if (error) return badRequest(error);

      const message = await this.getMessage.get({
        key: httpRequest.params.key,
        offset: httpRequest.header.offset,
        limit: httpRequest.header.limit,
      });

      return ok(message);
    } catch {
      return serverError();
    }
  }
}
