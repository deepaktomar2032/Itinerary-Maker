import { Request, Response } from "express";
import { message } from "../utils/locale";
import { FetchItineraryData, CreateRouteURL, CalculateRoute } from "../helper/Functions";
import { ItineraryModel } from "../model/itinerary.model";
import { statusCode } from "./../utils/statusCode";
import { LogErrorMessage } from "./../utils/error-handler";
import { ItineraryInterface } from "../Interface/ItineraryInterface";

export const RemoveStop = async (req: Request, res: Response) => {
    const { id, stopId } = req.params;

    try {
        const itineraryData: ItineraryInterface | null = await FetchItineraryData(id);
        if (!itineraryData) {
            return res.status(statusCode.not_found).send({ successful: false, Message: message.Itinerary_not_found });
        }

        itineraryData.itineraryStop.forEach((element, index) => {
            if (element.stopId === stopId) {
                itineraryData.itineraryStop.splice(index, 1);
            }
        });
        const routeURL = CreateRouteURL(itineraryData.itineraryStop) as string;
        const { routeData, totalDistanceKm } = await CalculateRoute(routeURL);

        const updateData = {
            itineraryStop: itineraryData.itineraryStop,
            routeData: routeData,
            totalDistanceKm: totalDistanceKm,
        };

        const options = { new: true };
        const newItineraryData = await ItineraryModel.findByIdAndUpdate(id, updateData, options);

        return res.status(statusCode.successful_request).send({ successful: true, Message: message.Removed_successfully, newItineraryData });
    } catch (error: unknown) {
        return res.status(statusCode.internal_server_error).send({ successful: false, error_message: LogErrorMessage(error) });
    }
};
