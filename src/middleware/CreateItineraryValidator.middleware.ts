import { Request, Response } from "express";
import { CreateItineraryValidation } from "../validation/itinerary.validation";
import { statusCode } from "./../utils/statusCode";

export const CreateItineraryValidator = (req: Request, res: Response, next: Function) => {
    let { itineraryName, itineraryStop } = req.body;
    itineraryStop = itineraryStop !== undefined ? itineraryStop : [];
    const { error } = CreateItineraryValidation.validate({ itineraryName: itineraryName, itineraryStop: itineraryStop });
    if (error) return res.status(statusCode.bad_request).send({ successful: false, error_message: error.message });

    next();
};
