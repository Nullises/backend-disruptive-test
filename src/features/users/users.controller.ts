import { Request, Response, NextFunction } from "express";
import * as usersService from "./users.service";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.getAll());
  } catch (err) {
    next(err);
  }
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.get(req.params.id));
  } catch (err) {
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.create(req.body));
  } catch (err) {
    console.error(`Error while creating the user`, err.message);
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating the user`, err.message);
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.remove(req.query.id, req.query.adminAccountId));
  } catch (err) {
    console.error(`Error while deleting the user`, err.message);
    next(err);
  }
}

export { getAll, get, create, update, remove };
