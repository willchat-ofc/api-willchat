import type { Express } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeDeleteMessageController } from "../factories/delete-message/delete-message";

export const deleteMessageRouter = (app: Express) => {
  app.delete("/key/message", adaptRoute(makeDeleteMessageController()));
};
