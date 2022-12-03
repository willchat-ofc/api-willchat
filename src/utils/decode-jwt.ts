import type { DecodeJwt } from "../presentation/protocols/decode-jwt";
import jwt from "jsonwebtoken";

export class UtilDecodeJwt implements DecodeJwt {
  public decode(token: string): any {
    return jwt.decode(token);
  }
}
