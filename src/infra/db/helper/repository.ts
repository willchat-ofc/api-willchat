import { TypeormHelper } from "./typeorm-helper";

import type { ObjectType, Repository } from "typeorm";

export abstract class TypeormRepository {
  public constructor(
    private readonly connection: TypeormHelper = TypeormHelper.getInstance()
  ) {}

  public getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity);
  }
}
