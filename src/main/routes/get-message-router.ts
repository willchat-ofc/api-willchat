import { adaptRoute } from "../adapters/express-router-adapter";
import type { Express } from "express";
import { makeGetMessageController } from "../factories/get-message/get-message";

export const getMessageByKeyRouter = (app: Express) => {
  app.get("/key/message/:key", adaptRoute(makeGetMessageController()));
};
