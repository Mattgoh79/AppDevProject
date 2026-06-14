/**
 * @file Manages all operations related to artists
 * @author aTT
 */
import express from "express";
import jwtAuth from "../middleware/jwtAuth.js";
import rbac from "../middleware/rbac.js";
import {
  createArtist,
  getArtists,
  getArtist,
  updateArtist,
  deleteArtist,
} from "../controllers/artist.js";
// import rateLimiter from "../middleware/rateLimiter.js";


const router = express.Router();

import {
  validatePostArtist,
  validatePutArtist,
} from "../middleware/validation/artist.js";
import rateLimiter from "../middleware/rateLimiter.js";
// router.post("/", validatePostArtist, jwtAuth, rbac("ADMIN"), createArtist,);
// router.get("/", rateLimiter, getArtists);
// router.get("/:id", rateLimiter, getArtist);
// router.put("/:id", validatePutArtist, updateArtist);

//UNCOMMENT AFTER ADDING, ROLE BASED ACCESS, AUTH, VALIDATION,  AND RATE LIMIT

router.post("/", validatePostArtist, jwtAuth, rbac("ADMIN"), createArtist,);
router.get("/",rateLimiter, getArtists);
router.get("/:id",rateLimiter, getArtist);
router.put("/:id", validatePutArtist,updateArtist);



// router.put("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });

router.delete("/:id", deleteArtist);
// router.delete("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });
// You can also chain routes like this:
// router.route("/").post(createArtist).get(getArtists);

export default router;