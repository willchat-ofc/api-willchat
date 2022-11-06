import Database from "better-sqlite3";
import type { DataSourceOptions } from "typeorm";
import { PostgreHelper } from "../../../../../src/infra/db/postgreSQL/helper/postgre-helper";

export class TestPostgreHelper {
  public constructor() {}

  private connection!: PostgreHelper;

  private testdb!: Database.Database;

  public async setupTestDB() {
    this.testdb = new Database(":memory:", { verbose: console.log });

    const config = {
      name: "default",
      type: "better-sqlite3",
      database: ":memory:",
    } as DataSourceOptions;

    this.connection = PostgreHelper.getInstance();
    await this.connection.startPostgre(config);
  }

  public async teardownTestDB() {
    await this.connection.stopPostgre();
    this.testdb.close();
  }
}
