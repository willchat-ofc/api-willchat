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
      const { body } = httpRequest;
      const error = this.validator.validate(body);
      if (error) return badRequest(error);

      const message = await this.saveMessage.save({
        key: body.key,
        message: body.message,
        userName: body.userName,
        userId: body.userId,
      });

      if (!message) return badRequest(new InvalidParamError("key"));

      return ok(message);
    } catch {
      return serverError();
    }
  }
}
