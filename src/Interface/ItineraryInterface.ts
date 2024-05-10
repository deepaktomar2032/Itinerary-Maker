import { IStop } from "./IStop";

export interface ItineraryInterface {
    _id: string;
    itineraryName: string;
    itineraryStop: [IStop];
    routeData?: object;
    totalDistanceKm: number;
}
