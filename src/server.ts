require("dotenv").config();
import { Express } from "express";

export const CreateServer = async (app: Express, Port: number) => {
    if (process.env.NODE_ENV !== "test") {
        app.listen(Port, () => {
            console.log(`Server is up & running on port: ${Port}`);
        });
    }
};
