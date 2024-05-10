export interface IStop {
    geolocation: {
        latitude: number;
        longitude: number;
    };
    stopName: string;
    stopId?: string;
}
