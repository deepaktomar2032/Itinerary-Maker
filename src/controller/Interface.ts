export interface ItineraryStopInterface {
    geolocation: {
        latitude: number;
        longitude: number;
    };
    stopName: string;
    stopId?: string;
}

export interface RouteResponseInterface {
    routeData: {};
    totalDistanceKm: number;
}

export interface ItineraryInterface {
    _id: string;
    itineraryName: string;
    itineraryStop: [ItineraryStopInterface];
    routeData?: object;
    totalDistanceKm: number;
}
