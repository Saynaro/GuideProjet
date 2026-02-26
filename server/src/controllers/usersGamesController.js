import { prisma } from "../config/db.js";


export const getUsersInfo = async (req, res) => {
    try {
        // If :userId is in the URL, use it. If not, use the ID from the token (ourselves)
        const userId = req.params.userId ? parseInt(req.params.userId) : req.user.id;
        
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
                bio: true,
                display_name: true,
                cover: true,
                _count: {
                    select: { followers: true } // result will be available in user._count.followers
                                                // this will count the number of followers for the user
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            bio: user.bio,
            display_name: user.display_name,
            cover: user.cover,
            email: user.email,
            followersCount: user._count.followers,
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

/*
                    -----------------------------------------
                    Take all games that user has guides for
                    -----------------------------------------
*/
export const getUserGamesWithGuides = async (req, res) => {
    try {
        // If :userId is in the URL, use it. If not, use the ID from the token (ourselves)
        const userId = req.params.userId ? parseInt(req.params.userId) : req.user.id;

        const games = await prisma.games.findMany({
            where: {
                guides: {
                    some: {             // le jeux qui a au moins un guide creé par user_id, sinon cacher
                        user_id: userId
                    }
                }
            },
            select: {
                id: true,
                title: true,
                cover: true
            }
        });

        res.json(games);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


/*
                -----------------------------------------
                Take all guides that user has for specific game
                -----------------------------------------
*/
export const getUserGuidesByGame = async (req, res) => {
    try {


        const { userId, gameId } = req.params;

        // 1. Determiner quel ID de user utiliser : celui de l'URL ou celui du token (pour "me")
        let targetUserId;
        
        // Verifier si userId est "me", "undefined" ou absent, et dans ce cas utiliser l'ID du token
        if (!userId || userId === "me" || userId === "undefined") {
            targetUserId = req.user.id; // Take user ID from token if "me", "undefined" or no userId in URL
        } else {
            targetUserId = Number(userId);
        }

        if (isNaN(targetUserId) || isNaN(Number(gameId))) {
            return res.status(400).json({ message: "Invalid User ID or Game ID" });
        }

        const guides = await prisma.guides.findMany({
            where: {
                user_id: targetUserId,
                game_id: Number(gameId)
            },
            include: {
                games: true,
                users: true
            },
            orderBy: {
                created_at: "desc"              // order guides by creation date, newest first
            }
        });

        res.json(guides);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};