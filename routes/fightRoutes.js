import { Router } from "express";
import { fightService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get("/", (req, res, next) => {
  try {
    res.data = fightService.getAll();
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", (req, res, next) => {
  try {
    const { fighter1, fighter2 } = req.body;
    if (!fighter1 || !fighter2) throw new Error("fighter1 and fighter2 ids are required");
    res.data = fightService.start(fighter1, fighter2);
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
