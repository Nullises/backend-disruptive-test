import { Request, Response, NextFunction } from "express";
import * as categoriesService from "./categories.service";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await categoriesService.getAll());
  } catch (err) {
    console.error(`Error while getting the categories`, err.message);
    next(err);
  }
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await categoriesService.get(req.params.id));
  } catch (err) {
    console.error(`Error while getting the category`, err.message);
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await categoriesService.create(req.body));
  } catch (err) {
    console.error(`Error while creating the category`, err.message);
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await categoriesService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating the category`, err.message);
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(
      await categoriesService.remove(req.query.id, req.query.adminAccountId)
    );
  } catch (err) {
    console.error(`Error while deleting the category`, err.message);
    next(err);
  }
}

export { getAll, get, create, update, remove };
