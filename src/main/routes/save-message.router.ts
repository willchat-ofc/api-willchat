import type { Express } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeGetKeyController } from "../factories/get-key/get-key";
export default (app: Express) => {
  app.post("/key/message", adaptRoute(makeGetKeyController()));
};
