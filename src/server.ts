require("dotenv").config();
import { Express } from "express";
import { ConnectToDatabase } from "./config/db.config";
import { SwaggerDocs } from "../docs/Swagger/swagger";

export const CreateServer = async (app: Express, Port: number) => {
    if (process.env.NODE_ENV !== "test") {
        await ConnectToDatabase();
        app.listen(Port, () => {
            SwaggerDocs(app, Number(Port));
            console.log(`Server is up & running on port: ${Port}`);
        });
    }
};
