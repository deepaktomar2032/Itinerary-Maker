require("dotenv").config();
import mongoose from "mongoose";
import { LogErrorMessage } from "./..//src/utils/error-handler";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING!);
        console.log(`Successfully Connected to MongoDB!`);
    } catch (error: unknown) {
        console.error(`An error occurred ${LogErrorMessage(error)}`);
        process.exit(1);
    }
};
export const DisconnectDB = async () => {
    try {
        await mongoose.disconnect();
        await mongoose.connection.close();
    } catch (error: unknown) {
        console.error(`An error occurred ${LogErrorMessage(error)}`);
    }
};
