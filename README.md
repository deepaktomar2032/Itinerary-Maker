# itinerary-maker

# Repo : https://github.com/deepaktomar2031/Itinerary-Maker.git
## Branch:
- master - Source Branch
- deploy - Build deployment Branch

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

# The URL to the deployed application
- Application is deployed on https://render.com/

- BASE URL - https://itinerary-maker-v7lq.onrender.com
    - POST - https://itinerary-maker-v7lq.onrender.com/api/itinerary
    - GET - https://itinerary-maker-v7lq.onrender.com/api/itinerary/:id
    - POST - https://itinerary-maker-v7lq.onrender.com/api/itinerary/:id/stops
    - DELETE - https://itinerary-maker-v7lq.onrender.com/api/itinerary/:id/stops/:stopId
    - SWAGGER DOC - https://itinerary-maker-v7lq.onrender.com/api-docs