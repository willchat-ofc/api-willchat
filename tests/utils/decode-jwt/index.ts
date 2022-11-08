import type { DecodeJwt } from "../../../src/presentation/protocols/decode-jwt";
import jwt from "jsonwebtoken";

export class UtilDecodeJwt implements DecodeJwt {
  public decode(token: string): any {
    jwt.decode(token);
  }
}
