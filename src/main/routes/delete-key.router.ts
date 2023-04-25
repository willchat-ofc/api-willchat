import type { Express } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeDeleteKeyController } from "../factories/delete-key/delete-key";

export default (app: Express) => {
  app.delete("/key", adaptRoute(makeDeleteKeyController()));
};
