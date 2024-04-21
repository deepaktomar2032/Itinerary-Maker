import { Joi } from "express-validation";

const itineraryStopSchema = Joi.object().keys({
    stopName: Joi.string().required(),
    geolocation: Joi.object().required().keys({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
    }),
});

export const CreateItineraryValidation = Joi.object({
    itineraryName: Joi.string().required(),
    itineraryStop: Joi.array().items(itineraryStopSchema),
});
