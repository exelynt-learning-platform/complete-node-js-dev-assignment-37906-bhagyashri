
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Task Manager API",
            version: "1.0.0",
            description:
                "REST API documentation for managing tasks and users."
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Local development server"
            }
        ]
    },

    apis: [
        path.join(__dirname, "routes", "*.js")
    ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
