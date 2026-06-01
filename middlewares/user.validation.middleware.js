import { USER } from "../models/user.js";

const USER_KEYS = Object.keys(USER);
const REQUIRED_ON_CREATE = USER_KEYS.filter((k) => k !== "id");

const isValidEmail = (v) => typeof v === "string" && /^[^\s@]+@gmail\.com$/.test(v);
const isValidPhone = (v) => typeof v === "string" && /^\+380\d{9}$/.test(v);
const isValidPassword = (v) => typeof v === "string" && v.length >= 3;

const validateUserFields = (body, requireAll) => {
  const bodyKeys = Object.keys(body);

  if (bodyKeys.includes("id")) return "id must not be present in the request body";
  if (bodyKeys.some((k) => !USER_KEYS.includes(k))) return "Unknown fields are not allowed";

  if (requireAll) {
    if (REQUIRED_ON_CREATE.some((k) => body[k] == null || body[k] === ""))
      return "User entity to create isn't valid";
  } else {
    if (!bodyKeys.some((k) => USER_KEYS.includes(k)))
      return "At least one user field must be present";
  }

  if (body.email !== undefined && !isValidEmail(body.email))
    return "email must be a @gmail.com address";
  if (body.phone !== undefined && !isValidPhone(body.phone))
    return "phone must be in +380xxxxxxxxx format";
  if (body.password !== undefined && !isValidPassword(body.password))
    return "password must be at least 3 characters";

  return null;
};

const createUserValid = (req, res, next) => {
  const error = validateUserFields(req.body, true);
  if (error) res.err = new Error(error);
  next();
};

const updateUserValid = (req, res, next) => {
  const error = validateUserFields(req.body, false);
  if (error) res.err = new Error(error);
  next();
};

export { createUserValid, updateUserValid };
