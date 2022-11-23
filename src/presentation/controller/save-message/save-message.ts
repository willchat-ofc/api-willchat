import type { SaveMessage } from "../../../domain/usecase/save-message";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import type { Controller } from "../../protocols/controller";
import type { HttpRequest, HttpResponse } from "../../protocols/http";
import type { Validation } from "../../protocols/validation";

export class SaveMessageController implements Controller {
  public constructor(
    private readonly validator: Validation,
    private readonly saveMessage: SaveMessage
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body);
      if (error) return badRequest(error);

      const message = await this.saveMessage.save({
        key: httpRequest.body.key,
        message: httpRequest.body.message,
        userName: httpRequest.body.userName,
        userId: httpRequest.body.userId,
      });

      if (!message) return badRequest(new InvalidParamError("key"));

      return ok(message);
    } catch {
      return serverError();
    }
  }
}
