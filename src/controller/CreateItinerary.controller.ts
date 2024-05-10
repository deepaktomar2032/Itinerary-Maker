import { Request, Response } from "express";
import { message } from "../utils/locale";
import { ItineraryModel } from "../model/itinerary.model";
import { CreateRouteURL, CalculateRoute, AddStopId } from "../helper/Functions";
import { statusCode } from "./../utils/statusCode";
import { LogErrorMessage } from "./../utils/error-handler";

export const CreateItinerary = async (req: Request, res: Response) => {
    let { itineraryName, itineraryStop } = req.body;
    itineraryStop = itineraryStop !== undefined ? itineraryStop : [];

    // Set stopId to all stops
    itineraryStop = AddStopId(itineraryStop);

    const routeURL = CreateRouteURL(itineraryStop) as string;
    const { routeData, totalDistanceKm } = await CalculateRoute(routeURL);
    const itineraryDetails = {
        itineraryName: itineraryName,
        itineraryStop: itineraryStop,
        routeData: routeData,
        totalDistanceKm: totalDistanceKm,
    };

    try {
        const result = await ItineraryModel.create(itineraryDetails);
        res.status(statusCode.successful_request).send({ successful: true, Message: message.Created_successfully, result });
    } catch (error: unknown) {
        return res.status(statusCode.internal_server_error).send({ successful: false, error_message: LogErrorMessage(error) });
    }
};
