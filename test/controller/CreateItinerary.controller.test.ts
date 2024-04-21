import request from "supertest";
import { statusCode } from "./../../src/utils/statusCode";
import { app } from "../../src/index";
import { ConnectDB, DisconnectDB } from "../Connection";

describe("POST /api/itinerary", () => {
    beforeAll(async () => {
        await ConnectDB();
    });

    afterAll(async () => {
        await DisconnectDB();
    });

    it("Responds with 400 Bad Request on POST /api/itinerary due to missing fields in body", async () => {
        const body = {};
        const response = await request(app).post(`/api/itinerary/`).send(body);
        expect(response.statusCode).toBe(statusCode.bad_request);
    });

    it("Responds with 200 OK on POST /api/itinerary due to required fields are supplied in body & totalDistanceKm in response should be 0 as no stop is supplied", async () => {
        const body = { itineraryName: "Test Itinerary 1" };
        const response = await request(app).post(`/api/itinerary/`).send(body);
        expect(response.statusCode).toBe(statusCode.successful_request);
        expect(response.body.result.totalDistanceKm).toBe(0);
    });

    it("Responds with 200 OK on POST /api/itinerary due to required fields are supplied in body & totalDistanceKm in response should be 0 as 1 stop is supplied", async () => {
        const body = {
            itineraryName: "Test Itinerary 2",
            itineraryStop: [{ stopName: "Hamburg", geolocation: { latitude: 53.55, longitude: 10.0 } }],
        };
        const response = await request(app).post(`/api/itinerary/`).send(body);
        expect(response.statusCode).toBe(statusCode.successful_request);
        expect(response.body.result.totalDistanceKm).toBe(0);
    });

    it("Responds with 200 OK on POST /api/itinerary due to required fields are supplied in body & totalDistanceKm in response should be > 0 as more than 1 stops are supplied", async () => {
        const body = {
            itineraryName: "Test Itinerary 3",
            itineraryStop: [
                { stopName: "Hamburg", geolocation: { latitude: 53.55, longitude: 10.0 } },
                { stopName: "Berlin", geolocation: { latitude: 52.52, longitude: 13.405 } },
            ],
        };
        const response = await request(app).post(`/api/itinerary/`).send(body);
        expect(response.statusCode).toBe(statusCode.successful_request);
        expect(response.body.result.totalDistanceKm).toBeGreaterThan(0);
    });

    it("Responds with 200 OK on POST /api/itinerary due to required fields are supplied in body & totalDistanceKm in response should be 0 as both supplied stops are same", async () => {
        const body = {
            itineraryName: "Test Itinerary 4",
            itineraryStop: [
                { stopName: "Berlin", geolocation: { latitude: 52.52, longitude: 13.405 } },
                { stopName: "Berlin", geolocation: { latitude: 52.52, longitude: 13.405 } },
            ],
        };
        const response = await request(app).post(`/api/itinerary/`).send(body);
        expect(response.statusCode).toBe(statusCode.successful_request);
        expect(response.body.result.totalDistanceKm).toBe(0);
    });
});
