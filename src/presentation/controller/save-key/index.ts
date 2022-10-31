import { badRequest, serverError } from "../../helpers/http-helper";
import type { Validation } from "../../protocols/validation";
import type { HttpRequest, HttpResponse } from "../../protocols/http";
import type { Controller } from "../../protocols/controller";
import type { DecodeJwt } from "../../protocols/decode-jwt";
import { InvalidParamError } from "../../errors/invalid-param-error";
import type { SaveKey } from "../../../domain/usecase/save-key";

export class SaveKeyController implements Controller {
  public constructor(
    private readonly validator: Validation,
    private readonly decodeJwt: DecodeJwt,
    private readonly saveKey: SaveKey
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body);
      if (error) return badRequest(error);

      const { accountId } = this.decodeJwt.decode(httpRequest.body.accessToken);
      if (!accountId) return badRequest(new InvalidParamError("accessToken"));

      await this.saveKey.save({
        userId: accountId,
      });
    } catch {
      return serverError();
    }
  }
}
