import { DbGetMessage } from "../../../data/usecase/get-message";
import { GetMessagePostgreRepository } from "../../../infra/db/postgreSQL/repositories/get-message-repository";
import { GetMessageController } from "../../../presentation/controller/message/get-message";
import { makeGetMessageValidation } from "./get-message-validation";

export const makeGetMessageController = (): GetMessageController => {
  const getMessageRepository = new GetMessagePostgreRepository();
  const dbGetMessage = new DbGetMessage(getMessageRepository);
  const messageController = new GetMessageController(
    makeGetMessageValidation(),
    dbGetMessage
  );

  return messageController;
};
