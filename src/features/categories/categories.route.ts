import express from "express";
import * as categoriesController from "./categories.controller";

const router = express.Router();

router.get("/", categoriesController.getAll);

router.get("/:id", categoriesController.get);

router.post("/", categoriesController.create);

router.put("/:id", categoriesController.update);

router.delete("/", categoriesController.remove);

export default router;
