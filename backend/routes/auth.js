import express from "express";

import { register, login, logout } from "../controllers/auth.js";
import { validatePostUser } from "../middleware/validation/user.js";
import jwtAuth  from "../middleware/jwtAuth.js";

const router = express.Router();

router.post("/register", validatePostUser, register);
router.post("/login", login);
router.post("/logout", jwtAuth, logout);
export default router;