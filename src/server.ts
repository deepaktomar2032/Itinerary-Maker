require("dotenv").config();
import { Express } from "express";
import { ConnectToDatabase } from "./config/db.config";

export const CreateServer = async (app: Express, Port: number) => {
    if (process.env.NODE_ENV !== "test") {
        await ConnectToDatabase();
        app.listen(Port, () => {
            console.log(`Server is up & running on port: ${Port}`);
        });
    }
};
