import type { EntityTarget, ObjectLiteral } from "typeorm";
import { dataSource } from "../config";

export default {
  async startPostgre() {
    try {
      await dataSource.initialize();
      console.log("Data Source has been started");
    } catch {
      console.log("Error during Data Source initialization");
    }
  },

  async getRepository(repository: EntityTarget<ObjectLiteral>) {
    return dataSource.getRepository(repository);
  },
};
