import { InvalidParamError } from "../../errors/invalid-param-error";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import type { Controller } from "../../protocols/controller";
import type { DecodeJwt } from "../../protocols/decode-jwt";
import type { HttpRequest, HttpResponse } from "../../protocols/http";
import type { Validation } from "../../protocols/validation";

export class GetKeyController implements Controller {
  public constructor(
    private readonly validator: Validation,
    private readonly decodeJwt: DecodeJwt
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.header);
      if (error) return badRequest(error);

      const account = this.decodeJwt.decode(httpRequest.header.accesstoken);

      if (!account.accountId)
        return badRequest(new InvalidParamError("accesstoken"));

      return ok();
    } catch (err) {
      return serverError();
    }
  }
}
