import { makeSaveKeyValidation } from "./save-key-validation";
import { SaveKeyController } from "../../../presentation/controller/save-key";
import { DbSaveKey } from "../../../data/usecase/save-key/save-key";
import { SaveKeyPostgreRepository } from "../../../infra/db/postgreSQL/repositories/save-key-repository";
import { UtilGenerateKey } from "../../../utils/generate-key";
import { UtilDecodeJwt } from "../../../../tests/utils/decode-jwt";

export const makeSaveKeyController = (): SaveKeyController => {
  const dbSaveKey = new DbSaveKey(
    new SaveKeyPostgreRepository(),
    new UtilGenerateKey()
  );
  const utilDecodeJwt = new UtilDecodeJwt();

  return new SaveKeyController(
    makeSaveKeyValidation(),
    utilDecodeJwt,
    dbSaveKey
  );
};
