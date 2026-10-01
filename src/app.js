import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";

import router from "./routes/index.js";
import { swaggerSpec } from "./config/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "MANEJA Lite API",

    customCss: `
      .swagger-ui .topbar {
        display: none;
      }

      .swagger-ui .info {
        margin: 30px 0;
      }
    `,

    swaggerOptions: {
      operationsSorter: "method",

      persistAuthorization: true,

      filter: true,

      docExpansion: "list",

      displayRequestDuration: true,

      defaultModelsExpandDepth: -1,

      syntaxHighlight: {
        activate: true,
        theme: "nord",
      },
    },
  }),
);

export default app;
