import type { Express } from "express";
import { Router } from "express";
import fg from "fast-glob";

export const setupRoutes = (app: Express) => {
  const router = Router();

  app.use(router);

  fg.sync([
    "**/src/main/routes/**.router.ts",
    "**/src/main/routes/**-router/**.router.ts",
  ]).map(async (file) => {
    const fileList = file.split("/");
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const index = fileList.length - 1;
    console.log(`Loading the file router ${fileList[index]} ...`);

    (await import(`../../../${file}`)).default(router);
  });
};
