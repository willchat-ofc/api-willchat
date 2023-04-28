import type { DeleteMessage } from "../../../domain/usecase/delete-message";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import type { Controller } from "../../protocols/controller";
import type { HttpRequest, HttpResponse } from "../../protocols/http";
import type { Validation } from "../../protocols/validation";

export class DeleteMessageController implements Controller {
  public constructor(
    private readonly validator: Validation,
    private readonly deleteMessage: DeleteMessage
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.header);
      if (error) return badRequest(error);

      await this.deleteMessage.delete({
        key: httpRequest.header.key,
        messageId: httpRequest.header.messageid,
        accountId: httpRequest.body.accountId,
      });

      return ok();
    } catch (error) {
      return serverError();
    }
  }
}
