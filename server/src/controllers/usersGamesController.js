import { prisma } from "../config/db.js";


export const getUsersInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("User from middleware:", req.user);
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: {
                username: true,
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
            username: user.username,
            avatar: user.avatar,
            bio: user.bio,
            display_name: user.display_name,
            cover: user.cover,
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
        const userId = req.user.id;

        const games = await prisma.games.findMany({
            where: {
                guides: {
                    some: {
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
        const userId = req.user.id;
        const gameId = Number(req.params.gameId);

        const guides = await prisma.guides.findMany({
            where: {
                user_id: userId,
                game_id: gameId
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