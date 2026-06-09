/**
 * @file Manages all operations related to songs
 * @author aTT
 */
import express from "express";
// import jwtAuth from "../middleware/jwtAuth.js";
// import rbac from "../middleware/rbac.js";
import {
  createSong,
  getSongs,
  getSong,
  updateSong,
  deleteSong,
} from "../controllers/song.js";
// import rateLimiter from "../middleware/rateLimiter.js";


const router = express.Router();

// import {
//   validatePostSong,
//   validatePutSong,
// } from "../middleware/validation/song.js";
// router.post("/", validatePostSong, jwtAuth, rbac("ADMIN"), createSong,);
// router.get("/", rateLimiter, getSongs);
// router.get("/:id", rateLimiter, getSong);
// router.put("/:id", validatePutSong, updateSong);

//UNCOMMENT AFTER ADDING, ROLE BASED ACCESS, AUTH, VALIDATION,  AND RATE LIMIT

router.post("/", createSong,);
router.get("/", getSongs);
router.get("/:id", getSong);
router.put("/:id", updateSong);



// router.put("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });

router.delete("/:id", deleteSong);
// router.delete("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });
// You can also chain routes like this:
// router.route("/").post(createSong).get(getSongs);

export default router;