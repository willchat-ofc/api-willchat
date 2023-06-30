import type { Express } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeDeleteMessageController } from "../factories/delete-message/delete-message";

export default (app: Express) => {
  app.delete("/key/message", adaptRoute(makeDeleteMessageController()));
};
