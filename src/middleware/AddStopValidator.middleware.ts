import { Request, Response } from "express";
import { AddStopValidation } from "../validation/itinerary.validation";
import { statusCode } from "./../utils/statusCode";

export const AddStopValidator = (req: Request, res: Response, next: Function) => {
    let { itineraryStop } = req.body;
    const { error } = AddStopValidation.validate({ itineraryStop: itineraryStop });

    if (error) return res.status(statusCode.bad_request).send({ successful: false, error_message: error.message });

    next();
};
