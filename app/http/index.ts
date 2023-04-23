import ExpressServer from "./Server";
import { PORT } from "./config";

const myServer = new ExpressServer(PORT);

myServer.setup();
myServer.start();
