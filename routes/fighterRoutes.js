import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get("/", (req, res, next) => {
  try {
    res.data = fighterService.getAll();
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get("/:id", (req, res, next) => {
  try {
    res.data = fighterService.getOne(req.params.id);
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", createFighterValid, (req, res, next) => {
  if (!res.err) {
    try {
      res.data = fighterService.create(req.body);
    } catch (err) {
      res.err = err;
    }
  }
  next();
}, responseMiddleware);

router.patch("/:id", updateFighterValid, (req, res, next) => {
  if (!res.err) {
    try {
      res.data = fighterService.update(req.params.id, req.body);
    } catch (err) {
      res.err = err;
    }
  }
  next();
}, responseMiddleware);

router.delete("/:id", (req, res, next) => {
  try {
    res.data = fighterService.delete(req.params.id);
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
