import Entity, { EntityObject, EntityProps } from "../core/entities/Entity";

export default interface ISQLService {
  execute(query: string, parameters?: string[]): Promise<void>;
  query<T extends EntityProps>(
    query: string,
    parameters?: string[]
  ): Promise<EntityObject<T>[]>;
  findOne<T extends EntityProps>(
    query: string,
    parameters?: string[]
  ): Promise<EntityObject<T> | null>;
  insert<T extends Entity<EntityProps>>(
    table: string,
    data: T
  ): Promise<number>;
  update<T extends Entity<EntityProps>>(
    table: string,
    data: T,
    conditions: Partial<T>
  ): Promise<void>;
  delete<T extends Entity<EntityProps>>(
    table: string,
    conditions: Partial<T>
  ): Promise<void>;
}

export { EntityObject };
