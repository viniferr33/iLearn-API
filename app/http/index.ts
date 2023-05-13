import ExpressServer from "./Server";
import CreateStudentAdapter from "./adapters/Student/CreateStudent.adapter";
import { PORT, SQL_SERVER } from "./config";

const myServer = new ExpressServer(PORT, SQL_SERVER);
myServer.addRoute(CreateStudentAdapter);

myServer.setup();
myServer.start();
