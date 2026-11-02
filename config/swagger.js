
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Task Manager API",
            version: "1.0.0",
            description:
                "Task Manager API with authentication, validation, file uploads, pagination, filtering and CRUD operations."
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Local development server"
            }
        ],

        tags: [
            { name: "Authentication" },
            { name: "Tasks" },
            { name: "Users" }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "API Token"
                }
            }
        }
    },

    apis: [
        path.join(__dirname, "..", "routes", "*.js")
    ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
