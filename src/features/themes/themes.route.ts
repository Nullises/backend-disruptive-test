import express from "express";
import * as themesController from "./themes.controller";

const router = express.Router();

router.get("/", themesController.getAll);

router.get("/:id", themesController.get);

router.post("/", themesController.create);

router.put("/:id", themesController.update);

router.delete("/", themesController.remove);

export default router;
