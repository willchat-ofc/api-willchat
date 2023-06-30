import type { Express } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeSaveMessageController } from "../factories/save-message/save-message";

export default (app: Express) => {
  app.post("/key/message", adaptRoute(makeSaveMessageController()));
};
