import { PostgreHelper } from "./postgre-helper";

import type { ObjectType, Repository } from "typeorm";

export abstract class PostgreRepository {
  public constructor(
    private readonly connection: PostgreHelper = PostgreHelper.getInstance()
  ) {}

  public getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity);
  }
}
