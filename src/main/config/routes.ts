import type { Express } from "express";
import { Router } from "express";
import { deleteKeyRouter } from "../routes/delete-key-router";
import { deleteMessageRouter } from "../routes/delete-message-router";
import { getKeyRouter } from "../routes/get-key-router";
import { getMessageByKeyRouter } from "../routes/get-message-router";
import { addKeyRouter } from "../routes/save-key-router";
import { addMessage } from "../routes/save-message-router";

export const setupRoutes = (app: Express) => {
  const router = Router();

  app.use(router);
  deleteKeyRouter(app);
  deleteMessageRouter(app);
  getKeyRouter(app);
  getMessageByKeyRouter(app);
  addKeyRouter(app);
  addMessage(app);
};
