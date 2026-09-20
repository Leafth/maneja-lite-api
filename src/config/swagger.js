import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "MANEJA Lite API",
      version: "1.0.0",
      description:
        "Documentação da API simplificada do MANEJA para a disciplina de Desenvolvimento de Software para Dispositivos Móveis",
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
