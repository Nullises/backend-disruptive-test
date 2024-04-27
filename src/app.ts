import express, { Express, Request, Response } from "express";
import connectDB from "./config/mongo";
import bodyParser from "body-parser";

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

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server!");
});

export default app;
