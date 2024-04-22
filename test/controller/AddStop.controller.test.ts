import request from "supertest";
import { statusCode } from "./../../src/utils/statusCode";
import { app } from "../../src/index";
import { ConnectDB, DisconnectDB } from "../Connection";

describe("POST /api/itinerary/:id/stops", () => {
    beforeAll(async () => {
        await ConnectDB();
    });

    afterAll(async () => {
        await DisconnectDB();
    });

    it("Responds with 400 Bad Request on POST /api/itinerary/:id/stops, as required body fields are not supplied", async () => {
        const id: string = "6624e9e46ef1186a31a8bee8";
        const body = {};
        const response = await request(app).post(`/api/itinerary/${id}/stops`).send(body);
        expect(response.statusCode).toBe(statusCode.bad_request);
    });

    it("Responds with 404 Not Found on POST /api/itinerary/:id/stops, as ID doesn't exist in DB", async () => {
        const id: string = "6624e9e46ef1186a31a8bee8"; // ID that doesn't exist in DB
        const body = {
            itineraryStop: [{ stopName: "Hamburg", geolocation: { latitude: 53.55, longitude: 10 } }],
        };
        const response = await request(app).post(`/api/itinerary/${id}/stops`).send(body);
        expect(response.statusCode).toBe(statusCode.not_found);
    });

    it("Responds with 200 OK on POST /api/itinerary/:id/stops, should add that stop in Itinerary", async () => {
        const id: string = "6625692d99de0821db5b0273"; // ID that exists in DB
        const body = {
            itineraryStop: [{ stopName: "Hamburg", geolocation: { latitude: 53.55, longitude: 10 } }],
        };
        const response = await request(app).post(`/api/itinerary/${id}/stops`).send(body);
        expect(response.statusCode).toBe(statusCode.successful_request);
    });

    it("Responds with 200 OK on POST /api/itinerary/:id/stops, should add that stop in Itinerary", async () => {
        const id: string = "6625692d99de0821db5b0273"; // ID that exists in DB
        const body = {
            itineraryStop: [{ stopName: "Berlin", geolocation: { latitude: 52.52, longitude: 13.405 } }],
        };
        const response = await request(app).post(`/api/itinerary/${id}/stops`).send(body);
        expect(response.statusCode).toBe(statusCode.successful_request);
        if (response.body.newItineraryData.itineraryStop.length <= 1) expect(response.body.result.totalDistanceKm).toBe(0);
    });
});
