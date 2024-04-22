import request from "supertest";
import { statusCode } from "./../../src/utils/statusCode";
import { app } from "../../src/index";
import { ConnectDB, DisconnectDB } from "../Connection";

describe("GET /api/itinerary/:id", () => {
    beforeAll(async () => {
        await ConnectDB();
    });

    afterAll(async () => {
        await DisconnectDB();
    });

    it("Responds with 404 Not Found on GET /api/itinerary/:id, when id is not found in DB", async () => {
        const id: string = "6624e9e46ef1186a31a8bee7"; // ID that doesn't exist in DB
        const response = await request(app).get(`/api/itinerary/${id}`);
        expect(response.statusCode).toBe(statusCode.not_found);
    });

    it("Responds with 200 OK on GET /api/itinerary/:id, when Id is found in DB & totalDistanceKm in response should be 0, if <= 1 stops are there", async () => {
        const id: string = "6625b8a25e00a40c963271a2"; // ID that exists in DB with one stop only
        const response = await request(app).get(`/api/itinerary/${id}`);
        expect(response.statusCode).toBe(statusCode.successful_request);
        if (response.body.result.itineraryStop.length <= 1) expect(response.body.result.totalDistanceKm).toBe(0);
    });

    it("Responds with 200 OK on GET /api/itinerary/:id, when Id is found in DB & totalDistanceKm in response should be > 0 if more than 1 stops are there", async () => {
        const id: string = "6625b8a25e00a40c963271a2"; // ID that exists in DB with more than one stop
        const response = await request(app).get(`/api/itinerary/${id}`);
        expect(response.statusCode).toBe(statusCode.successful_request);
        expect(response.body.result.routeData).toBeDefined();
        if (response.body.result.itineraryStop.length > 1) expect(response.body.result.totalDistanceKm).toBeGreaterThan(0);
    });
});
