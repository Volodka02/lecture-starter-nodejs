import { FIGHTER } from "../models/fighter.js";

const FIGHTER_KEYS = Object.keys(FIGHTER);
const REQUIRED_ON_CREATE = FIGHTER_KEYS.filter((k) => k !== "id" && k !== "health");

const isValidPower = (v) => typeof v === "number" && v >= 1 && v <= 100;
const isValidDefense = (v) => typeof v === "number" && v >= 1 && v <= 10;
const isValidHealth = (v) => typeof v === "number" && v >= 80 && v <= 120;
const isValidName = (v) => typeof v === "string" && v.trim().length > 0;

const validateFighterFields = (body, requireAll) => {
  const bodyKeys = Object.keys(body);

  if (bodyKeys.includes("id")) return "id must not be present in the request body";
  if (bodyKeys.some((k) => !FIGHTER_KEYS.includes(k))) return "Unknown fields are not allowed";

  if (requireAll) {
    if (REQUIRED_ON_CREATE.some((k) => body[k] == null || body[k] === ""))
      return "Fighter entity to create isn't valid";
  } else {
    if (bodyKeys.length === 0) return "At least one fighter field must be present";
  }

  if (body.name !== undefined && !isValidName(body.name))
    return "name must be a non-empty string";
  if (body.power !== undefined && !isValidPower(body.power))
    return "power must be a number between 1 and 100";
  if (body.defense !== undefined && !isValidDefense(body.defense))
    return "defense must be a number between 1 and 10";
  if (body.health !== undefined && !isValidHealth(body.health))
    return "health must be a number between 80 and 120";

  return null;
};

const createFighterValid = (req, res, next) => {
  const error = validateFighterFields(req.body, true);
  if (error) res.err = new Error(error);
  next();
};

const updateFighterValid = (req, res, next) => {
  const error = validateFighterFields(req.body, false);
  if (error) res.err = new Error(error);
  next();
};

export { createFighterValid, updateFighterValid };
