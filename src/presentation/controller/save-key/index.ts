import { badRequest, ok, serverError } from "../../helpers/http-helper";
import type { Validation } from "../../protocols/validation";
import type { HttpRequest, HttpResponse } from "../../protocols/http";
import type { Controller } from "../../protocols/controller";
import type { SaveKey } from "../../../domain/usecase/save-key";
import { AlreadyExistsError } from "../../errors/user-already-exists-error";

export class SaveKeyController implements Controller {
  public constructor(
    private readonly validator: Validation,
    private readonly saveKey: SaveKey
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.header);
      if (error) return badRequest(error);

      const key = await this.saveKey.save({
        userId: httpRequest.body.accountId,
      });

      if (!key) return badRequest(new AlreadyExistsError());

      return ok(key);
    } catch (err) {
      return serverError();
    }
  }
}
