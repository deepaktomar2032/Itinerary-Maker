import { Request, Response } from "express";
import { ItineraryModel } from "../model/itinerary.model";
import { message } from "../utils/locale";
import { FetchItineraryData, CalculateRoute, AddStopId } from "../helper/Functions";
import { statusCode } from "./../utils/statusCode";
import { LogErrorMessage } from "./../utils/error-handler";

export const AddStop = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    let { itineraryStop } = req.body;

    // Set stopId to all newly added stops
    itineraryStop = AddStopId(itineraryStop);

    try {
        const itineraryData = await FetchItineraryData(id);
        if (!itineraryData) {
            return res.status(statusCode.not_found).send({ successful: false, Message: message.Itinerary_not_found });
        }
        const updatedItineraryStop = [...itineraryData.itineraryStop, ...itineraryStop];

        const { routeData, totalDistanceKm } = await CalculateRoute(updatedItineraryStop);

        const updateData = {
            itineraryStop: updatedItineraryStop,
            routeData: routeData,
            totalDistanceKm: totalDistanceKm,
        };

        const options = { new: true };
        const newItineraryData = await ItineraryModel.findByIdAndUpdate(id, updateData, options);

        return res.status(statusCode.successful_request).send({ successful: true, Message: message.Updated_successfully, newItineraryData });
    } catch (error: unknown) {
        return res.status(statusCode.internal_server_error).send({ successful: false, error_message: LogErrorMessage(error) });
    }
};
