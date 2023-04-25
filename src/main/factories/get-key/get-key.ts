import { GetKeyPostgreRepository } from "../../../infra/db/postgreSQL/repositories/get-key-repository";
import { GetKeyController } from "../../../presentation/controller/key/get-key";

export const makeGetKeyController = () => {
  const getKeyRepository = new GetKeyPostgreRepository();

  return new GetKeyController(getKeyRepository);
};
