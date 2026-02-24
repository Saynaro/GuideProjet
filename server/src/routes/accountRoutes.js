import express from "express";
import { authMiddleware } from "../middleware/authMiddlewares.js";
import { updateProfile } from "../controllers/accountControllers.js";
import { upload } from "../config/upload.js";



const router = express.Router();

router.use(authMiddleware);

router.post(
    "/update", 
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "cover", maxCount: 1 }
    ]), 
    updateProfile
);

export default router;