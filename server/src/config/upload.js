import multer from "multer";
import path from "path";
import fs from "fs";
import { guidesPath } from "./pathsAddPhoto.js";


// 3. Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Saving file to:", guidesPath);
        cb(null, guidesPath); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage });