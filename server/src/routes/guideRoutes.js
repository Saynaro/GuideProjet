import express from "express";
import { authMiddleware } from "../middleware/authMiddlewares.js";
import { getGuidesByGame, createGuide, deleteGuide, updateGuide, getSingleGuide } from "../controllers/addGuideController.js";
import { upload } from "../config/upload.js";

const router = express.Router();



router.use(authMiddleware);
router.get("/single/:id", getSingleGuide);
router.get("/:id", getGuidesByGame);
// localhost:5001/guides
router.post("/", upload.array("images", 5), createGuide); // 5 images max;   "images" - key from FormData in  ajoutGuide.js

// localhost:5001/guides/:id
// localhost:5001/guides/10
router.delete("/:id", deleteGuide);

router.put("/:id", updateGuide);


export default router;