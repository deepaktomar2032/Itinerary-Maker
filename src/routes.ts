import { Router } from "express";
import { CreateItinerary } from "./controller/CreateItinerary.controller";
import { FindItinerary } from "./controller/FindItinerary.controller";

export const routes = (router: Router) => {
    router.post("/api/itinerary", CreateItinerary);
    router.get("/api/itinerary/:id", FindItinerary);
};
