import { CreateItineraryValidation, AddStopValidation } from "./../../src/validation/itinerary.validation";

describe("Function CreateItineraryValidation", () => {
    const createItineraryBody1 = {};
    it("Responds with error in response as 'itineraryName' is a mandatory field", () => {
        const result = CreateItineraryValidation.validate(createItineraryBody1);
        expect(result.error).toBeDefined();
    });

    const createItineraryBody2 = { itineraryName: "Trip to Europe" };
    it("Responds with no error in response as mandatory field 'itineraryName' supplied", () => {
        const result = CreateItineraryValidation.validate(createItineraryBody2);
        expect(result.error).toBeUndefined();
    });
});

describe("Function AddStopValidation", () => {
    const itineraryStop1 = { itineraryStop: [{ geolocation: { latitude: 53.55 }, stopName: "Hamburg" }] };
    it("Responds with error in response as 'longitude' is a mandatory field", () => {
        const result = AddStopValidation.validate(itineraryStop1);
        expect(result.error).toBeDefined();
    });

    const itineraryStop2 = { itineraryStop: [{ geolocation: { latitude: 53.55, longitude: 10 } }] };
    it("Responds with error in response as 'stopName' is a mandatory field", () => {
        const result = AddStopValidation.validate(itineraryStop2);
        expect(result.error).toBeDefined();
    });

    const itineraryStop3 = { itineraryStop: [{ geolocation: { latitude: 53.55, longitude: 10 }, stopName: "Hamburg" }] };
    it("Responds with no error in response as all mandatory fields are supplied", () => {
        const result = AddStopValidation.validate(itineraryStop3);
        expect(result.error).toBeUndefined();
    });
});
