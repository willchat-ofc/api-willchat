import { env } from "./config/env";
import app from "./config/app";
import { TypeormHelper } from "../infra/db/helper/typeorm-helper";
import { configElephant } from "../infra/db/postgreSQL/config";

const bootstrap = async () => {
  await TypeormHelper.getInstance()
    .startPostgre(configElephant)
    .catch((err: Error) => {
      console.log(`Database Error: ${err}`);
    });

  app.listen(env.port, () => {
    console.log(`The server has started as 'http://localhost:${env.port}'`);
  });
};

bootstrap();
