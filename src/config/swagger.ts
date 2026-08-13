import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FoodApplication Backend API System",
      version: "1.0.0",
      description:
        "Comprehensive RESTful API documentation for Food Delivery System with Supabase Auth, Email OTP Verification & Order Tracking.",
      contact: {
        name: "FoodApplication Engineering Team",
        email: "hieupro120593@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Express Server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
