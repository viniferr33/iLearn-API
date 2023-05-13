import PostgreService from "../../src/infra/db.SQL/PostgreService";
import SQLServerService from "../../src/infra/db.SQL/SQLServerService";

const PORT = 8080;

const POSTGRE = new PostgreService({
  user: "postgres",
  host: "localhost",
  database: "ilearn",
  password: "myPassword",
  port: 5432,
});

const SQL_SERVER = new SQLServerService({
  server: process.env.DB_SERVER ?? "",
  database: process.env.DB_DATABASE ?? "",
  password: process.env.DB_PASSWORD ?? "",
  user: process.env.DB_USER ?? "",
});

export { POSTGRE, SQL_SERVER, PORT };
