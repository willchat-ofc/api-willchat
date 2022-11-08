import Database from "better-sqlite3";
import type { DataSourceOptions } from "typeorm";
import { TypeormHelper } from "../../../../../src/infra/db/helper/typeorm-helper";

export class TestTypeormHelper {
  public constructor() {}

  private connection!: TypeormHelper;

  private testdb!: Database.Database;

  public async setupTestDB() {
    this.testdb = new Database(":memory:", { verbose: console.log });

    const config = {
      name: "default",
      type: "better-sqlite3",
      database: ":memory:",
    } as DataSourceOptions;

    this.connection = TypeormHelper.getInstance();
    await this.connection.startPostgre(config);
  }

  public async teardownTestDB() {
    await this.connection.stopPostgre();
    this.testdb.close();
  }
}
