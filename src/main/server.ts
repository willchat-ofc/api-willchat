import { env } from "./config/env";
import app from "./config/app";
import { TypeormHelper } from "../infra/db/helper/typeorm-helper";
import { configElephant } from "../infra/db/postgreSQL/config";
import http from "http";
import https from "https";
import fs from "fs";

const bootstrap = async () => {
  await TypeormHelper.getInstance()
    .startPostgre(configElephant)
    .catch((err: Error) => {
      console.log(`Database Error: ${err}`);
    });

  let server: http.Server | https.Server;

  if (env.cert) {
    server = https.createServer(
      {
        cert: fs.readFileSync(env.cert),
        key: fs.readFileSync(env.key),
      },
      app
    );
  } else {
    server = http.createServer(app);
  }

  server.listen(env.port, () => {
    console.log(`The server has started as 'http://localhost:${env.port}'`);
  });
};

bootstrap();
