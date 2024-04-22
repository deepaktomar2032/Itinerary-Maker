import request from "supertest";
import { statusCode } from "./../../src/utils/statusCode";
import { app } from "../../src/index";
import { ConnectDB, DisconnectDB } from "../Connection";

describe("DELETE /api/itinerary/:id/stops/:stopId", () => {
    beforeAll(async () => {
        await ConnectDB();
    });

    afterAll(async () => {
        await DisconnectDB();
    });

    it("Responds with 400 Bad Request on POST /api/itinerary/:id/stops/:stopId, as Id doesn't exist in DB", async () => {
        const id: string = "6624e9e46ef1186a31a8bee9"; // ID that doesn't exist in DB
        const stopId: string = "3ffdfb96-5d12-4db8-ace3-5cf9a584dfaf";
        const response = await request(app).delete(`/api/itinerary/${id}/stops/${stopId}`);
        expect(response.statusCode).toBe(statusCode.not_found);
    });

    it("Responds with 200 OK Request on POST /api/itinerary/:id/stops/:stopId, & remove that stop from Itinerary as Id exists in DB", async () => {
        const id: string = "6625692d99de0821db5b0273"; // ID that exists in DB
        const stopId: string = "30a7d61e-42b0-4854-b8c0-abff1a377cd2";
        const response = await request(app).delete(`/api/itinerary/${id}/stops/${stopId}`);
        expect(response.statusCode).toBe(statusCode.successful_request);
    });
});
