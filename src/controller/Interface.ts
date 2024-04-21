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
