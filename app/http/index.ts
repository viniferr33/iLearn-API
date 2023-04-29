import ExpressServer from "./Server";
import CreateStudentAdapter from "./adapters/Student/CreateStudent.adapter";
import { PORT } from "./config";

const myServer = new ExpressServer(PORT);
myServer.addRoute(CreateStudentAdapter);

myServer.setup();
myServer.start();
