import { GetKeyPostgreRepository } from "../../../infra/db/postgreSQL/repositories/get-key-repository";
import { GetKeyController } from "../../../presentation/controller/get-key";
import { makeGetKeyValidation } from "./get-key-validation";
export const makeGetKeyController = () => {
  const getKeyRepository = new GetKeyPostgreRepository();

  return new GetKeyController(makeGetKeyValidation(), getKeyRepository);
};
