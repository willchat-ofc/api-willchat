import { DataSource } from "typeorm";
import type { DataSourceOptions, ObjectType, Repository } from "typeorm";
import { KeyEntity } from "../entities/key-postgresql-entity";
import { MessagesEntity } from "../entities/message-postgresql-entity";
import { ChatEntity } from "../entities/chat-postgresql-entity";

export class PostgreHelper {
  private static instance?: PostgreHelper;

  private connection!: DataSource;

  public static getInstance(): PostgreHelper {
    if (!PostgreHelper.instance) PostgreHelper.instance = new PostgreHelper();
    return PostgreHelper.instance;
  }

  public async startPostgre(config: DataSourceOptions) {
    try {
      const dataSource = new DataSource({
        ...config,
        synchronize: true,
        logging: false,
        entities: [KeyEntity, MessagesEntity, ChatEntity],
      });
      this.connection = await dataSource.initialize();
      console.log("Data Source has been started");
    } catch {
      console.log("Error during Data Source initialization");
    }
  }

  public async stopPostgre() {
    console.log("run destroy");

    await this.connection.destroy();
    this.connection = null;
  }

  public getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity);
  }
}
