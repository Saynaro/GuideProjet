import express from "express";
import { authMiddleware } from "../middleware/authMiddlewares.js";
import { deleteProfile, updateProfile } from "../controllers/accountControllers.js";
import { upload } from "../config/upload.js";



const router = express.Router();

router.use(authMiddleware);

router.post( "/update", 
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "cover", maxCount: 1 }
    ]), updateProfile);


router.delete("/delete", deleteProfile);
export default router;