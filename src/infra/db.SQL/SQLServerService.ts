import ISQLService, { EntityObject } from "../ISQLService";
import Entity, { EntityProps } from "../../core/entities/Entity";
import * as mssql from "mssql";

type SQLServerConfig = {
  user: string;
  password: string;
  server: string;
  database: string;
};

export default class SQLServerService implements ISQLService {
  private readonly pool: mssql.ConnectionPool;

  constructor(config: SQLServerConfig) {
    this.pool = new mssql.ConnectionPool(config);
  }

  private lowerCaseKeys(obj: Object) {
    const entries = Object.entries(obj);

    function camelize(str: String) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    }

    return Object.fromEntries(
      entries.map(([key, value]) => {
        return [camelize(key), value];
      })
    );
  }

  async query<T extends EntityProps>(
    query: string,
    parameters?: string[]
  ): Promise<EntityObject<T>[]> {
    await this.pool.connect();
    try {
      const request = this.pool.request();

      parameters?.forEach((param, index) =>
        request.input(`${index + 1}`, param)
      );

      const result = await request.query(query.replace(/\$/g, "@"));
      return result.recordset.map(
        (obj) => this.lowerCaseKeys(obj) as EntityObject<T>
      );
    } finally {
      await this.pool.close();
    }
  }

  async findOne<T extends EntityProps>(
    query: string,
    parameters?: string[]
  ): Promise<EntityObject<T> | null> {
    await this.pool.connect();
    try {
      const request = this.pool.request();

      parameters?.forEach((param, index) =>
        request.input(`${index + 1}`, param)
      );

      const result = await request.query(query.replace(/\$/g, "@"));
      const sanitizedResult = result.recordset.map(
        (obj) => this.lowerCaseKeys(obj) as EntityObject<T>
      );

      return sanitizedResult.length === 0 ? null : sanitizedResult[0];
    } finally {
      await this.pool.close();
    }
  }

  async insert<T extends Entity<EntityProps>>(
    table: string,
    data: T
  ): Promise<number> {
    try {
      await this.pool.connect();

      const fields = Object.keys(data.props).join(",");
      const values = Object.values(data.props).map((value) => `'${value}'`);

      const request = this.pool.request();

      const query = `INSERT INTO ${table} (${fields}) VALUES (${values}) SELECT SCOPE_IDENTITY()`;
      const result = await request.query(query);

      const myRows = Object.values(result.recordset[0]);
      const id = Number(myRows[0]);
      return id;
    } finally {
      await this.pool.close();
    }
  }

  async update<T extends Entity<EntityProps>>(
    table: string,
    data: T,
    conditions: Partial<T>
  ): Promise<void> {
    try {
      await this.pool.connect();
      const setClause = Object.keys(data.props)
        .map((key, index) => `[${key}] = @param${index + 1}`)
        .join(",");

      console.log(setClause);
      const whereClause = Object.keys(conditions)
        .map(
          (key, index) =>
            `[${key}] = @param${index + Object.keys(data.props).length + 1}`
        )
        .join(" AND ");
      const values = [
        ...Object.values(data.props),
        ...Object.values(conditions),
      ];

      const request = this.pool.request();

      values.forEach((value, index) =>
        request.input(`param${index + 1}`, value)
      );

      const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
      console.log(query);
      await request.query(query);
    } finally {
      await this.pool.close();
    }
  }

  async delete<T extends Entity<EntityProps>>(
    table: string,
    conditions: Partial<T>
  ): Promise<void> {
    try {
      await this.pool.connect();
      const whereClause = Object.keys(conditions)
        .map((key, index) => `${key} = @param${index + 1}`)
        .join(" AND ");
      const values = Object.values(conditions);

      const request = this.pool.request();

      values.forEach((value, index) =>
        request.input(`param${index + 1}`, value)
      );

      const query = `DELETE ${table} WHERE ${whereClause}`;
      await request.query(query);
    } finally {
      await this.pool.close();
    }
  }

  async execute(query: string, parameters?: string[]): Promise<void> {
    try {
      await this.pool.connect();
      const request = new mssql.Request(this.pool);
      if (parameters) {
        parameters.forEach((param, index) => {
          request.input(`param${index}`, mssql.VarChar, param);
        });
      }
      await request.query(query);
    } finally {
      await this.pool.close();
    }
  }
}
