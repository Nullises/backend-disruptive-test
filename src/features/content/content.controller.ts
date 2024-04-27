import { Request, Response, NextFunction } from "express";
import * as contentService from "./content.service";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await contentService.getAll());
  } catch (err) {
    console.error(`Error while getting the contents`, err.message);
    next(err);
  }
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await contentService.get(req.params.id));
  } catch (err) {
    console.error(`Error while getting the content`, err.message);
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await contentService.create(req.body));
  } catch (err) {
    console.error(`Error while creating the content`, err.message);
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await contentService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating the content`, err.message);
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(
      await contentService.remove(req.query.id, req.query.adminAccountId)
    );
  } catch (err) {
    console.error(`Error while deleting the content`, err.message);
    next(err);
  }
}

export { getAll, get, create, update, remove };
