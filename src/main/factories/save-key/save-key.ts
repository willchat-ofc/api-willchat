import { makeSaveKeyValidation } from "./save-key-validation";
import { SaveKeyController } from "../../../presentation/controller/key/save-key";
import { DbSaveKey } from "../../../data/usecase/save-key";
import { SaveKeyPostgreRepository } from "../../../infra/db/postgreSQL/repositories/save-key-repository";
import { UtilGenerateKey } from "../../../utils/generate-key";

export const makeSaveKeyController = (): SaveKeyController => {
  const dbSaveKey = new DbSaveKey(
    new SaveKeyPostgreRepository(),
    new UtilGenerateKey()
  );

  return new SaveKeyController(makeSaveKeyValidation(), dbSaveKey);
};
