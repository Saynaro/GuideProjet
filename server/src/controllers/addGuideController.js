import dayjs from "dayjs";

import { prisma } from "../config/db.js";





const getGuidesByGame = async (req, res) => {
    const gameId = parseInt(req.params.id);

    if (isNaN(gameId)) {
        return res.status(400).json({ error: "Invalid game id" });
    }
    try {
        const guides = await prisma.guides.findMany({
            where: { game_id: gameId },
            include: {
                users: true,
                games: true
            },
            orderBy: { created_at: "desc" }
        });

        res.json(guides);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};



const createGuide = async (req, res) => {
    try {
        const { game_id, image, content, title } = req.body;

        const gameIdNumber = Number(game_id);

        const game = await prisma.games.findUnique({
            where: { id: gameIdNumber },
        });

        if (!game) {
            return res.status(404).json({ error: "Game not found"})
        }

        const imagesArray = req.files ? req.files.map(file => file.filename) : [];

        const guide = await prisma.guides.create({
            data: {
                user_id: req.user.id,
                game_id: gameIdNumber,
                image: JSON.stringify(imagesArray),
                content: content,
                title: title,
            }
        })

        // Format the created_at date to "DD.MM.YYYY"
        const formattedGuide = {
            ...guide,
            created_at: new Date(guide.created_at).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        };

        res.status(201).json({
            status: "Success",
            data: formattedGuide,
        });
    } catch (error) {
        console.error("FATAL ERROR:", error); 
        res.status(500).json({ status: "Error", message: error.message });
    }
};


const updateGuide = async (req, res) => {
        const { image, text } = req.body;

        const guide = await prisma.guides.findUnique({
            where: { id: req.params.id },
        });

        if (!guide) {
            return res.status(404).json({ error: "Guide not found"})
        }

        if (guide.user_id !== req.user.id) {
            return res.status(403).json({error: "Not allowed to update this guide"})
        }

        const updatedGuide = await prisma.guides.update({
            where: { id: req.params.id },
            data: updateData,
        });


        // build update data
        const updateData = {};
        if (text !== undefined) {
            updateData.text = text;
        }
        if (image !== undefined) {
            updateData.image = image;
        };


        res.status(200).json({
            status: "Success",
            message: "Guide removed",
        });
};


const deleteGuide = async (req, res) => {

        const guide = await prisma.guides.findUnique({
            where: { id: req.params.id },
        });

        if (!guide) {
            return res.status(404).json({ error: "Guide not found"})
        }

        if (guide.user_id !== req.user.id) {
            return res.status(403).json({error: "Not allowed to delete this guide"})
        }

        await prisma.guides.delete({
            where: { id: req.params.id }
        })

        res.status(200).json({
            status: "Success",
            message: "Guide removed",
        });
};


export { getGuidesByGame, createGuide, deleteGuide, updateGuide };