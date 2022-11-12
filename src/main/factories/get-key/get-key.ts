import { GetKeyPostgreRepository } from "./../../../infra/db/postgreSQL/repositories/get-key-repository/index";
import { UtilDecodeJwt } from "../../../utils/decode-jwt";
import { GetKeyController } from "./../../../presentation/controller/get-key/index";
import { makeGetKeyValidation } from "./get-key-validation";
export const makeGetKeyController = () => {
  const decodeJwt = new UtilDecodeJwt();
  return new GetKeyController(
    makeGetKeyValidation(),
    decodeJwt,
    new GetKeyPostgreRepository()
  );
};
