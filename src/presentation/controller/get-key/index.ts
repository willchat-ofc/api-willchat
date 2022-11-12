import type { GetKey } from "../../../domain/usecase/get-key";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import type { Controller } from "../../protocols/controller";
import type { DecodeJwt } from "../../protocols/decode-jwt";
import type { HttpRequest, HttpResponse } from "../../protocols/http";
import type { Validation } from "../../protocols/validation";

export class GetKeyController implements Controller {
  public constructor(
    private readonly validator: Validation,
    private readonly decodeJwt: DecodeJwt,
    private readonly getKey: GetKey
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.header);
      if (error) return badRequest(error);

      const account = this.decodeJwt.decode(httpRequest.header.accesstoken);
      if (!account.accountId)
        return badRequest(new InvalidParamError("accesstoken"));

      const key = await this.getKey.get({
        userId: account.accountId as string,
      });

      return ok(key);
    } catch (err) {
      return serverError();
    }
  }
}
