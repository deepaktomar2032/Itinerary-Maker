require("dotenv").config();
import { v4 as uuidv4 } from "uuid";
import { message } from "../utils/locale";
import { IStop } from "../Interface/IStop";
import { IRouteResponse } from "../Interface/IRouteResponse";
import { ItineraryInterface } from "../Interface/ItineraryInterface";
import { ItineraryModel } from "../model/itinerary.model";
import { LogErrorMessage } from "../utils/error-handler";

const apiKey = process.env.API_KEY;
const Base_URL = `https://maps.googleapis.com/maps/api/directions/json?`;

export const CalculateRoute = async (itineraryStop: IStop[]): Promise<IRouteResponse> => {
    // Atleast 2 stops should be there to calculate the route
    if (itineraryStop.length < 2) return { routeData: {}, totalDistanceKm: 0 };

    const originlatitude = itineraryStop[0].geolocation.latitude;
    const originlongitude = itineraryStop[0].geolocation.longitude;

    const destinationlatitude = itineraryStop[itineraryStop.length - 1].geolocation.latitude;
    const destinationlongitude = itineraryStop[itineraryStop.length - 1].geolocation.longitude;

    let wayPoints = "";
    // excluding source & destination (first & last)
    for (let index = 1; index < itineraryStop.length - 1; ++index) {
        wayPoints += `${itineraryStop[index].geolocation.latitude},${itineraryStop[index].geolocation.longitude}`;
        if (index != itineraryStop.length - 2) wayPoints += `|`;
    }

    const midURL = `origin=${originlatitude},${originlongitude}&destination=${destinationlatitude},${destinationlongitude}&waypoints=${wayPoints}`;
    const apiUrl = `${Base_URL}${midURL}&key=${apiKey}`;

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
