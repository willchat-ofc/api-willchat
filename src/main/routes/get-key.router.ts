import { makeGetKeyController } from "../factories/get-key/get-key";
import type { Express } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";

export default (app: Express) => {
  app.get("/key", adaptRoute(makeGetKeyController()));
};
