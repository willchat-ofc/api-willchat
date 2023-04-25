import type { DeleteKey } from "../../../domain/usecase/delete-key";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import type { Controller } from "../../protocols/controller";
import type { HttpRequest, HttpResponse } from "../../protocols/http";
import type { Validation } from "../../protocols/validation";

export class DeleteKeyController implements Controller {
  public constructor(
    private readonly validator: Validation,
    private readonly deleteKey: DeleteKey
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.header);
      if (error) return badRequest(error);

      await this.deleteKey.delete({
        accountId: httpRequest.body.accountId,
        key: httpRequest.header.key,
      });

      return ok();
    } catch (err) {
      return serverError();
    }
  }
}
