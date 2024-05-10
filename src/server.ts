require("dotenv").config();
import express, { Express } from "express";
import { ConnectToDatabase } from "./config/db.config";
import { SwaggerDocs } from "../docs/Swagger/swagger";
import { routes } from "./routes";
import { LogErrorMessage } from "./utils/error-handler";
import bodyParser from "body-parser";

export const app: Express = express();
export const Port = process.env.Port || 8000;

const listenPort = (Port: number) => {
    app.listen(Port, () => console.log(`Server is up & running on http://localhost:${Port}`));
};

const createBodyParser = () => {
    app.use(express.json());
    app.use(bodyParser.json());
};

const createRoutes = () => {
    routes(app);
};

const connectToDB = async () => {
    await ConnectToDatabase();
};

const createSwaggerDocs = () => {
    SwaggerDocs(app, Number(Port));
};

const start = async () => {
    try {
        if (process.env.NODE_ENV !== "test") {
            await listenPort(Number(Port));
            createSwaggerDocs();
        }
        createBodyParser();
        await connectToDB();
        await createRoutes();
    } catch (error: unknown) {
        console.log(LogErrorMessage(error));
    }
};

export default {
    start,
};
