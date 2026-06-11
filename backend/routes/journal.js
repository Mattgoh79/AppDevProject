/**
 * @file Manages all operations related to journals
 * @author aTT
 */
import express from "express";
// import jwtAuth from "../middleware/jwtAuth.js";
// import rbac from "../middleware/rbac.js";
import {
  createJournal,
  getJournals,
  getJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journal.js";
// import rateLimiter from "../middleware/rateLimiter.js";


const router = express.Router();

// import {
//   validatePostJournal,
//   validatePutJournal,
// } from "../middleware/validation/journal.js";
// router.post("/", validatePostJournal, jwtAuth, rbac("ADMIN"), createJournal,);
// router.get("/", rateLimiter, getJournals);
// router.get("/:id", rateLimiter, getJournal);
// router.put("/:id", validatePutJournal, updateJournal);

//UNCOMMENT AFTER ADDING, ROLE BASED ACCESS, AUTH, VALIDATION,  AND RATE LIMIT

router.post("/", createJournal,);
router.get("/", getJournals);
router.get("/:id", getJournal);
router.put("/:id", updateJournal);



// router.put("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });

router.delete("/:id", deleteJournal);
// router.delete("/", (req, res) => {
//   return res.status(400).json({
//     message: "id is required in the URL parameter",
//   });
// });
// You can also chain routes like this:
// router.route("/").post(createJournal).get(getJournals);

export default router;