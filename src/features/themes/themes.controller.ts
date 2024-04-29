import { Request, Response, NextFunction } from "express";
import * as themesService from "./themes.service";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await themesService.getAll());
  } catch (err) {
    next(err);
  }
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await themesService.get(req.params.id));
  } catch (err) {
    console.error(`Error while getting the theme`, err.message);
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await themesService.create(req.body));
  } catch (err) {
    console.error(`Error while creating the theme`, err.message);
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await themesService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating the theme`, err.message);
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(
      await themesService.remove(req.query.id, req.query.adminAccountId)
    );
  } catch (err) {
    console.error(`Error while deleting the theme`, err.message);
    next(err);
  }
}

export { getAll, get, create, update, remove };
