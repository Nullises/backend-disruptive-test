import express, { Express, Request, Response } from "express";
import connectDB from "./config/mongo";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// Routes
import { users } from "./features/users";
import { themes } from "./features/themes";
import { categories } from "./features/categories";
import { content } from "./features/content";

app.use("/users", users);
app.use("/themes", themes);
app.use("/categories", categories);
app.use("/content", content);

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Disruptive Backend Test",
      version: "0.1.0",
      description:
        "Disruptive Backend Test application made with Express and documented with Swagger",
      contact: {
        name: "Nullises",
        url: "https://portafolio-nullises.vercel.app/",
        email: "texanico@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["src/**/*.ts"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server!");
});

export default app;
