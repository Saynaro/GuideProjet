import express from "express";
import { authMiddleware } from "../middleware/authMiddlewares.js";
import { getUserGamesWithGuides, getUserGuidesByGame, getUsersInfo } from "../controllers/usersGamesController.js";


const router = express.Router();

router.use(authMiddleware);

router.get("/me", getUsersInfo);

router.get("/me/games-with-guides", getUserGamesWithGuides);

// /users/me/games/:gameId/guides
router.get( "/me/games/:gameId/guides", getUserGuidesByGame );

export default router;