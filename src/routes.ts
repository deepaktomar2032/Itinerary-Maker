import { Router } from "express";
import { CreateItinerary } from "./controller/CreateItinerary.controller";
import { FindItinerary } from "./controller/FindItinerary.controller";
import { AddStop } from "./controller/AddStop.controller";
import { RemoveStop } from "./controller/RemoveStop.controller";
import { CreateItineraryValidator } from "./middleware/CreateItineraryValidator.middleware";
import { AddStopValidator } from "./middleware/AddStopValidator.middleware";

export const routes = (router: Router) => {
    router.post("/api/itinerary", CreateItineraryValidator, CreateItinerary);
    router.get("/api/itinerary/:id", FindItinerary);
    router.post("/api/itinerary/:id/stops", AddStopValidator, AddStop);
    router.delete("/api/itinerary/:id/stops/:stopId", RemoveStop);
};
