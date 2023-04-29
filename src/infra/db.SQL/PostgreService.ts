import Entity, { EntityProps } from "../../core/entities/Entity";
import ISQLService, { EntityObject } from "../ISQLService";
import { Pool, QueryResult } from "pg";

type PostgreConfig = {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
};

export default class PostgreService implements ISQLService {
  private readonly pool: Pool;

  constructor(config: PostgreConfig) {
    this.pool = new Pool(config);
  }

  async execute(query: string, parameters?: string[]): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query(query, parameters);
    } finally {
      client.release();
    }
  }

  async query<T extends EntityProps>(
    query: string,
    parameters?: string[]
  ): Promise<EntityObject<T>[]> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(query, parameters);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async findOne<T extends EntityProps>(
    query: string,
    parameters?: string[]
  ): Promise<EntityObject<T> | null> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(query, parameters);
      return result.rowCount === 0 ? null : result.rows[0];
    } finally {
      client.release();
    }
  }

  async insert<T extends Entity<EntityProps>>(
    table: string,
    data: T
  ): Promise<number> {
    const fields = Object.keys(data.props).join(",");
    const placeholders = Object.keys(data.props)
      .map((_, index) => `$${index + 1}`)
      .join(",");
    const values = Object.values(data.props);
    const query = `INSERT INTO ${table} (${fields}) VALUES (${placeholders}) RETURNING id`;
    const result = await this.query(
      query,
      values.map((val) => String(val))
    );

    return result[0].id;
  }

  async update<T extends Entity<EntityProps>>(
    table: string,
    data: T,
    conditions: Partial<T>
  ): Promise<void> {
    const setClause = Object.keys(data.props)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(",");
    const whereClause = Object.keys(conditions)
      .map(
        (key, index) =>
          `${key} = $${index + Object.keys(data.props).length + 1}`
      )
      .join(" AND ");
    const values = [...Object.values(data.props), ...Object.values(conditions)];
    const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
    await this.execute(query, values);
  }

  async delete<T extends Entity<EntityProps>>(
    table: string,
    conditions: Partial<T>
  ): Promise<void> {
    const whereClause = Object.keys(conditions)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(" AND ");

    const values = Object.values(conditions);
    const query = `DELETE FROM ${table} WHERE ${whereClause}`;
    await this.execute(query, values);
  }
}
