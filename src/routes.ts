import { Router } from "express";
import { CreateItinerary } from "./controller/CreateItinerary.controller";

export const routes = (router: Router) => {
    router.post("/api/itinerary", CreateItinerary);
};
