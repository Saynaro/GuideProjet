import { prisma } from "../config/db.js";


export const afficheJeux = async (req, res) => {
    try {
        const games = await prisma.games.findMany();

        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};


