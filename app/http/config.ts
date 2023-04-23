import PostgreService from "../../src/infra/db.SQL/PostgreService";

const PORT = 8080;

const SQL_SERVICE = new PostgreService({
  user: "string",
  host: "string",
  database: "string",
  password: "string",
  port: 0,
});

export { SQL_SERVICE, PORT };
