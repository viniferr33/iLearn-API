import ExpressServer from "./Server";
import CreateStudentAdapter from "./adapters/Student/CreateStudent.adapter";
import DeleteStudentAdapter from "./adapters/Student/DeleteStudent.adapter";
import GetStudentAdapter from "./adapters/Student/GetStudent.adapter";
import ListStudentsAdapter from "./adapters/Student/ListStudents.adapter";
import UpdateStudentAdapter from "./adapters/Student/UpdateStudent.adapter";
import { PORT, SQL_SERVER } from "./config";

const myServer = new ExpressServer(PORT, SQL_SERVER);
myServer.addRoute(CreateStudentAdapter);
myServer.addRoute(ListStudentsAdapter);
myServer.addRoute(GetStudentAdapter);
myServer.addRoute(DeleteStudentAdapter);
myServer.addRoute(UpdateStudentAdapter);

myServer.setup();
myServer.start();
