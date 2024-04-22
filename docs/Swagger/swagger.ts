import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import path from "path";
import yaml from "yamljs";

const swaggerYML = yaml.load(path.resolve(__dirname, "./swagger.yml"));

const initialOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Travel Itinerary API",
            version: version,
            description: "Travel Itinerary API Docs",
        },
    },
};
const options: swaggerJsdoc.Options = {
    swaggerDefinition: {
        ...initialOptions,
        ...swaggerYML,
    },
    apis: [path.resolve(__dirname, "./../../src/routes.ts"), path.resolve(__dirname, "./../../src/validation/*.ts")],
};

const SwaggerSpec = swaggerJsdoc(options);

export const SwaggerDocs = (app: Express, port: number) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerSpec));

    app.get("/api-docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(SwaggerSpec);
    });

    console.log(`Docs are available at http://localhost:${port}/api-docs`);
};
