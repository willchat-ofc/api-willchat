import { DataSource } from "typeorm";
import type { DataSourceOptions, ObjectType, Repository } from "typeorm";
import { KeyEntity } from "../postgreSQL/entities/key-postgresql-entity";
import { MessagesEntity } from "../postgreSQL/entities/message-postgresql-entity";
import { ChatEntity } from "../postgreSQL/entities/chat-postgresql-entity";

export class TypeormHelper {
  private static instance?: TypeormHelper;

  private connection!: DataSource;

  public static getInstance(): TypeormHelper {
    if (!TypeormHelper.instance) TypeormHelper.instance = new TypeormHelper();
    return TypeormHelper.instance;
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
    } catch (err) {
      console.log(err);
      console.log("Error during Data Source initialization");
    }
  }

  public async stopPostgre() {
    await this.connection.destroy();
    this.connection = null;
  }

  public getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity);
  }
}
