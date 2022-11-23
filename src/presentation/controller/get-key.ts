import type { GetKey } from "../../domain/usecase/get-key";
import { UserNotExistsError } from "../errors/user-not-exists-error";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import type { Controller } from "../protocols/controller";
import type { HttpRequest, HttpResponse } from "../protocols/http";
import type { Validation } from "../protocols/validation";

export class GetKeyController implements Controller {
  public constructor(
    private readonly validator: Validation,
    private readonly getKey: GetKey
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.header);
      if (error) return badRequest(error);

      const key = await this.getKey.get({
        userId: httpRequest.body.accountId,
      });

      if (!key) return badRequest(new UserNotExistsError());

      return ok(key);
    } catch (err) {
      return serverError();
    }
  }
}
