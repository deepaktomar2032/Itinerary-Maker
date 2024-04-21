import { CreateItineraryValidation } from "./../../src/validation/itinerary.validation";

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
