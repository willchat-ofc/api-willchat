import { DbDeleteKey } from "../../../data/usecase/delete-key";
import { DeleteKeyPostgreRepository } from "../../../infra/db/postgreSQL/repositories/delete-key-repository";
import { DeleteKeyController } from "../../../presentation/controller/key/delete-key";
import { makeDeleteKeyValidation } from "./delete-key-validation";

export const makeDeleteKeyController = () => {
  const controllerValidation = makeDeleteKeyValidation();
  const deleteKeyRepository = new DeleteKeyPostgreRepository();
  const dbDeleteKey = new DbDeleteKey(deleteKeyRepository);

  return new DeleteKeyController(controllerValidation, dbDeleteKey);
};
