import express from "express";
import * as contentController from "./content.controller";

const router = express.Router();

router.get("/", contentController.getAll);

router.get("/:id", contentController.get);

router.post("/", contentController.create);

router.put("/:id", contentController.update);

router.delete("/", contentController.remove);

export default router;
