import type { Express } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeSaveKeyController } from "../factories/save-key/save-key";

export const addKeyRouter = (app: Express) => {
  app.post("/key", adaptRoute(makeSaveKeyController()));
};
