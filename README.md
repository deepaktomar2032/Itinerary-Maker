## Objective:

Develop a RESTful API for a travel app that allows users to create, update, and manage itineraries with various stops, including route calculation for itineraries with multiple stops. This challenge is designed to assess your skills in backend development using TypeScript and Express.js, your ability to integrate with external services (Google Maps), write comprehensive unit tests, and deploy your application.

## Requirements:

- **Programming Language and Environment**: The API must be written in TypeScript and use the framework Express.js or Fastify.
- **API Endpoints**:
  - **POST** `/itinerary`: Create a new itinerary. The body should accept a name and an optional list of stops.
  - **GET** `/itinerary/:id`: Retrieve an existing itinerary by its ID, including the calculated route if available.
  - **POST** `/itinerary/:id/stops`: Add one or more stops to an itinerary. Each stop should include at least a name and a geographical location (latitude and longitude). If more than one stop is provided, a route between these stops must be calculated using the Google Maps JavaScript SDK and included as an own field in the response when retrieving the itinerary.
  - **DELETE** `/itinerary/:id/stops/:stopId`: Remove a stop from an itinerary.
- **Data Storage**: Use an in-memory store or a simple file-based storage mechanism to persist itineraries and their stops. Using a database is optional.
- **Unit Tests**: Write unit tests for your API endpoints ensuring coverage of the main functionalities, including route calculation.
- **Error Handling**: Implement proper error handling and return appropriate HTTP status codes.

## Advanced Requirements (Optional):

- **Integration with Google Maps**: Use the Google Maps JavaScript SDK for route calculation. Handle any potential errors from the Google Maps service gracefully.
- **TypeScript Proficiency**: Incorporate the following TypeScript features to demonstrate advanced knowledge:
  - Use of `enum` types for defining constants.
  - Implement `interface` or `type` definitions for request and response objects, ensuring strict type-checking.
  - Utilize `generics` for utility functions that could be used across different types of objects.
- **Deployment**: Deploy your application on Fly.io, Vercel, or Netlify. Include a README with instructions on accessing the deployed API.
- **Documentation**: Provide API documentation using Swagger or any other API documentation tool.

## Submission Guidelines:

- Push your code to a GitHub repository
- Include a README.md file with:
  - Instructions on how to set up and run your project locally.
  - A brief explanation of your application architecture and choices.
  - Instructions on how to run the unit tests.
  - The URL to the deployed application and any additional instructions for accessing it, if applicable.

## Evaluation Criteria:

- **Code Quality**: Clean, understandable, and well-structured code.
- **API Design**: RESTful practices, proper use of HTTP verbs and status codes.
- **Integration with External Services**: Effective use of the Google Maps JavaScript SDK for route calculation.
- **Testing**: Comprehensive tests demonstrating an understanding of testing principles.
- **Problem Solving**: Effective solutions to the requirements, including challenges introduced by external API integration.
- **Documentation**: Clear and helpful documentation, both in code and in the README.

## Timeframe:

You should aim to complete this challenge within 3-4 hours. However, the quality of the implementation, including code clarity, project structure, and documentation, will be valued over speed.


# itinerary-maker

# Repo : https://github.com/deepaktomar2031/Itinerary-Maker
## Branch:
- master - Source Branch

# Run Project locally
- clone the project
- create .env file at the root of the project & set given variables
- npm install
- npm run dev
    - It will run the server on port 8080 & api's available to consume
    - POST - http://localhost:8000/api/itinerary
    - GET - http://localhost:8000/api/itinerary/:id
    - POST - http://localhost:8000/api/itinerary/:id/stops
    - DELETE - http://localhost:8000/api/itinerary/:id/stops/:stopId
    - SWAGGER DOC - http://localhost:8000/api-docs

# Build project
- npm run build

# Run Unit Tests
- npm test

# Application Architecture
- MVC arch. is used to develop this application
    - docs/
        - diagram/
            - has project flow diagram
        - Swagger/
            - Swagger API documentation
    - src/
        - index.ts - entry point of the project, server.ts helps to create the server & connect to DB
        - routes.ts - has 4 routes depending on the request
        - controller/ - has 4 controllers to make calculation & serve the reqest, Functions.ts is has commonly used fucntions
        - validation/ - has a validator to validate the body of incoming request
        - model/ - has model to intract with DB (MongoDB)
        - utils/ - has common functionality to be used through out the project (messages & statusCodes)
    - test/
        - Unit tests to test the project
