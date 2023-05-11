import ExpressServer from "./Server";
import CreateStudentAdapter from "./adapters/Student/CreateStudent.adapter";
import { PORT, SQL_SERVICE } from "./config";

const myServer = new ExpressServer(PORT, SQL_SERVICE);
myServer.addRoute(CreateStudentAdapter);

myServer.setup();
myServer.start();
