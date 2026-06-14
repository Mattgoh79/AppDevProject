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
// import rateLimiter from "../middleware/rateLimiter.js";


const router = express.Router();

import {
  validatePostUser,
  validatePutUser,
} from "../middleware/validation/user.js";
import rateLimiter from "../middleware/rateLimiter.js";
// router.post("/", validatePostUser, jwtAuth, rbac("ADMIN"), createUser,);
// router.get("/", rateLimiter, getUsers);
// router.get("/:id", rateLimiter, getUser);
// router.put("/:id", validatePutUser, updateUser);

//UNCOMMENT AFTER ADDING, ROLE BASED ACCESS, AUTH, VALIDATION,  AND RATE LIMIT

router.post("/",validatePostUser, jwtAuth, createUser,);
router.get("/", rateLimiter, getUsers);
router.get("/:id", rateLimiter, getUser);
router.put("/:id",validatePutUser, updateUser);



// router.put("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });

router.delete("/:id", deleteUser);
// router.delete("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });
// You can also chain routes like this:
// router.route("/").post(createUser).get(getUsers);

export default router;