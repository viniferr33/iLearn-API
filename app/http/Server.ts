import express, { Router, Application, json } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Server } from "http";
import { serve, setup } from "swagger-ui-express";

import { IAdapterConstructor, Method } from "./adapters/Adapter";
import AuthHandler from "./handlers/AuthHandler";
import ErrorHandler from "./handlers/ErrorHandler";

import swaggerData from "./swagger/swagger.json";

import ISQLService from "../../src/infra/ISQLService";

export default class ExpressServer {
  public app: Application;
  public router: Router;

  private errorHandler = new ErrorHandler();
  private authHandler = new AuthHandler(this.sqlServer);

  private _setup = false;
  private _server!: Server;

  constructor(protected port: number, private sqlServer: ISQLService) {
    this.app = express();
    this.router = Router();
  }

  public setup(): void {
    this.app.use(helmet());
    this.app.use(cors({}));
    this.app.use(json());

    this.swaggerSetup();

    if (process.env.NODE_ENV !== "production") this.app.use(morgan("dev"));

    // Auth handle is binded to its parent class
    // Express is JS based which means that "use" method only takes a object reference, not the instancec itself
    // In order to call the full instance, it needs to be binded (method -> instance)
    this.app.use("/api/*", this.authHandler.handle.bind(this.authHandler));
    this.app.use(this.router);
    this.app.use(this.errorHandler.handleNotFound.bind(this.errorHandler));
    this.app.use(this.errorHandler.handle.bind(this.errorHandler));

    this._setup = true;
  }

  public addRoute(adapter: IAdapterConstructor): void {
    const myAdapter = new adapter(this.sqlServer);
    const path = "/api/" + myAdapter.path;

    switch (myAdapter.method) {
      case Method.GET:
        this.router.get(path, myAdapter.handle.bind(myAdapter));
        break;

      case Method.POST:
        this.router.post(path, myAdapter.handle.bind(myAdapter));
        break;

      case Method.DELETE:
        this.router.delete(path, myAdapter.handle.bind(myAdapter));
        break;

      case Method.PUT:
        this.router.put(path, myAdapter.handle.bind(myAdapter));
        break;
    }
  }

  public start(): void {
    if (!this._setup)
      throw new Error("Cannot Start the Server! Missing Setup call...");

    if (this._server?.listening)
      throw new Error("Server is already listening!");

    this._server = this.app.listen(this.port, () => {
      console.clear();
      console.log("Server is running on port: " + this.port);
    });
  }

  public stop(): void {
    if (!this._server.listening) throw new Error("Server is not listening!");
    this._server.close();
  }

  private swaggerSetup(): void {
    this.router.use("/api/docs", serve, setup(swaggerData));
  }
}
