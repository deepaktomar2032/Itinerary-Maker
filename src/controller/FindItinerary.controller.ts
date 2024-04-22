import { Request, Response } from "express";
import { message } from "../utils/locale";
import { statusCode } from "./../utils/statusCode";
import { LogErrorMessage } from "./../utils/error-handler";
import { ItineraryModel } from "../model/itinerary.model";

export const FindItinerary = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const result = await ItineraryModel.findById(id);
        if (!result) {
            return res.status(statusCode.not_found).send({ successful: false, Message: message.Itinerary_not_found });
        }

        return res.status(statusCode.successful_request).send({ successful: true, Message: message.Found_successfully, result });
    } catch (error: unknown) {
        return res.status(statusCode.internal_server_error).send({ successful: false, error_message: LogErrorMessage(error) });
    }
};
