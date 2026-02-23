import express from 'express'
import { afficheJeux } from "../controllers/afficheJeuxControllers.js";

const router = express.Router();

router.get("/afficheJeux", afficheJeux);


export default router;