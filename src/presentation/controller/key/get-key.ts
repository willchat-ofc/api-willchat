import type { GetKey } from "../../../domain/usecase/get-key";
import { UserNotExistsError } from "../../errors/user-not-exists-error";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import type { Controller } from "../../protocols/controller";
import type { HttpRequest, HttpResponse } from "../../protocols/http";

export class GetKeyController implements Controller {
  public constructor(private readonly getKey: GetKey) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const key = await this.getKey.get({
        userId: httpRequest.body.accountId,
      });

      if (!key.length) return badRequest(new UserNotExistsError());

      return ok(key);
    } catch (err) {
      return serverError();
    }
  }
}
