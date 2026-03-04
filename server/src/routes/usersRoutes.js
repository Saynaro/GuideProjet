import express from "express";
import { authMiddleware } from "../middleware/authMiddlewares.js";
import { getUserGamesWithGuides, getUserGuidesByGame, getUsersInfo } from "../controllers/usersGamesController.js";


const router = express.Router();

router.use(authMiddleware);

// /users/me for ourself, /users/:userId for other users
router.get("/me", getUsersInfo);
router.get("/me/games-with-guides", getUserGamesWithGuides);
// /users/me/games/:gameId/guides
router.get( "/me/games/:gameId/guides", getUserGuidesByGame );


// Parametre :userId can take a number (exemple /users/6)
router.get("/:userId", getUsersInfo); 
router.get("/:userId/games-with-guides", getUserGamesWithGuides);
router.get("/:userId/games/:gameId/guides", getUserGuidesByGame);

export default router;