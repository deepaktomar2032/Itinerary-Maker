import mongoose, { Schema } from "mongoose";

const ItinerarySchema = new mongoose.Schema(
    {
        itineraryName: { type: String, required: true },
        itineraryStop: [
            {
                _id: { type: Schema.Types.ObjectId, auto: false },
                stopName: { type: String, required: true },
                geolocation: {
                    latitude: { type: Number, required: true },
                    longitude: { type: Number, required: true },
                },
                stopId: { type: String },
            },
        ],
        routeData: { type: Object, required: true },
        totalDistanceKm: { type: Number, required: true },
    },
    { collection: "Itinerary", versionKey: false }
);

export const ItineraryModel = mongoose.model("Itinerary", ItinerarySchema);
