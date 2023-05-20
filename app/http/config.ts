import PostgreService from "../../src/infra/db.SQL/PostgreService";
import SQLServerService from "../../src/infra/db.SQL/SQLServerService";

const UNGERISTERED_PATHS = [
  {
    path: "/api/docs",
    method: "GET",
  },
  {
    path: "/api/docs/swagger-ui-bundle.js",
    method: "GET",
  },
  {
    path: "/api/docs/swagger-ui-init.js",
    method: "GET",
  },
  {
    path: "/api/docs/swagger-ui-standalone-preset.js",
    method: "GET",
  },
  {
    path: "/api/docs/swagger-ui.css",
    method: "GET",
  },
  /////////////////////////////////////////////
  {
    path: "/api/students",
    method: "POST",
  },
  {
    path: "/api/login",
    method: "POST",
  },
];

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

export { POSTGRE, SQL_SERVER, PORT, UNGERISTERED_PATHS };
