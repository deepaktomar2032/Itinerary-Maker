require("dotenv").config();
import { v4 as uuidv4 } from "uuid";
import { message } from "../utils/locale";
import { IStop } from "../Interface/IStop";
import { IRouteResponse } from "../Interface/IRouteResponse";
import { ItineraryInterface } from "../Interface/ItineraryInterface";
import { ItineraryModel } from "../model/itinerary.model";
import { LogErrorMessage } from "../utils/error-handler";
import { Base_URL } from "../constant/constants";
import { RouteUrlBuilder } from "./RouteUrlBuilder";

const apiKey = process.env.API_KEY;
export const CreateRouteURL = (itineraryStop: IStop[]): string => {
    if (itineraryStop.length < 2) return Base_URL;
    const apiUrl = new RouteUrlBuilder(Base_URL);
    apiUrl.addOrigin(itineraryStop);
    apiUrl.addDestination(itineraryStop);
    apiUrl.addWayPoint(itineraryStop);
    apiUrl.addApiKey(apiKey!.toString());
    return apiUrl.build();
};

export const CalculateRoute = async (apiUrl: string): Promise<IRouteResponse> => {
    // Atleast 2 stops should be there to calculate the route
    if (apiUrl === Base_URL) return { routeData: {}, totalDistanceKm: 0 };

    try {
        const route = await fetch(apiUrl);
        const routeData = await route.json();

        let totalDistanceM: number = 0;
        for (let i = 0; i < routeData.routes[0].legs.length; i++) {
            totalDistanceM += routeData.routes[0].legs[i].distance.value;
        }

        const totalDistanceKm: number = calculateDistanceInKm(totalDistanceM);
        return { routeData, totalDistanceKm };
    } catch (error: unknown) {
        console.log(`${message.Something_went_wrong} Error: ${LogErrorMessage(error)}`);
        return { routeData: {}, totalDistanceKm: 0 };
    }
};

export const calculateDistanceInKm = (totalDistance: number): number => {
    return totalDistance / 1000;
};

export const AddStopId = (itineraryStopArray: IStop[]): IStop[] => {
    itineraryStopArray.forEach((element: IStop) => {
        element.stopId = uuidv4();
    });
    return itineraryStopArray;
};

export const FetchItineraryData = async (id: String): Promise<ItineraryInterface | null> => {
    return await ItineraryModel.findById(id);
};
