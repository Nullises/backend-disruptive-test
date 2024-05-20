import express, { Express, Request, Response } from "express";
import connectDB from "./config/mongo";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import { users } from "./features/users";
import { themes } from "./features/themes";
import { categories } from "./features/categories";
import { content } from "./features/content";

dotenv.config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const FRONT_HOST = process.env.FRONT_HOST;

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect MongoDB
connectDB();

// CORS
const corsOptions = {
  origin: [
    `${HOST}`,
    `http://localhost:3001`,
    "https://backend-disruptive-test-production.up.railway.app",
  ], // Specify the allowed origin(s)
  methods: "GET, POST, PUT, DELETE", // Specify allowed HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Specify allowed headers
};

app.use(cors(corsOptions));

// Routes

app.use("/users", users);
app.use("/themes", themes);
app.use("/categories", categories);
app.use("/content", content);

// Swagger Setup
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
        url: `${HOST}:${PORT}`,
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
