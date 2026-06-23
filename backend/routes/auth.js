import express from "express";

import { register, login } from "../controllers/auth.js";
import { validatePostUser } from "../middleware/validation/user.js";

const router = express.Router();

router.post("/register", validatePostUser, register);
router.post("/login", login);

export default router;