/**
 * @file Manages all operations related to users
 * @author aTT
 */
import express from "express";
import jwtAuth from "../middleware/jwtAuth.js";
// import rbac from "../middleware/rbac.js";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";


const router = express.Router();

import {
  validatePostUser,
  validatePutUser,
} from "../middleware/validation/user.js";
import rateLimiter from "../middleware/rateLimiter.js";

router.post("/",validatePostUser, jwtAuth, createUser,);
router.get("/", rateLimiter, getUsers);
router.get("/:id", rateLimiter, getUser);
router.put("/:id",validatePutUser, updateUser);



router.delete("/:id", deleteUser);

export default router;