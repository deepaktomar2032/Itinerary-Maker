require("dotenv").config();
import express, { Express } from "express";
import bodyParser from "body-parser";
import { routes } from "./routes";
import { CreateServer } from "./server";
import { LogErrorMessage } from "./utils/error-handler";

export const app: Express = express();
export const Port = process.env.Port || 8000;

CreateServer(app, Number(Port))
    .then(() => {
        app.use(express.json());
        app.use(bodyParser.json());
        routes(app);
    })
    .catch((error: unknown) => {
        console.error(`An error occurred ${LogErrorMessage(error)}`);
    });
