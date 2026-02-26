import dayjs from "dayjs";

import { prisma } from "../config/db.js";


// utilise en viewGuides.js pour afficher un guide 
const getSingleGuide = async (req, res) => {
    try {
        const { id } = req.params;

        const guide = await prisma.guides.findUnique({
            where: { id: parseInt(id) },
            include: {
                users: true, // Pour inclure les infos de l'utilisateur qui a créé le guide
                games: true  // Pour inclure les infos du jeu associé au guide
            }
        });

        if (!guide) {
            return res.status(404).json({ message: "Guide non trouvé" });
        }

        res.json(guide);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};


const getGuidesByGame = async (req, res) => {
    const gameId = parseInt(req.params.id);

    if (isNaN(gameId)) {
        return res.status(400).json({ error: "Invalid game id" });
    }

    try {
        const guides = await prisma.guides.findMany({
            where: { game_id: gameId },
            include: {
                users: {
                    select: {
                        id: true,
                        username: true,
                        display_name: true,
                        avatar: true
                        // Le password est caché
                    }
                },
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


        // Build an array of image filenames from the uploaded files
        const imagesArray = (req.files || []).map(f => f.filename);


        const game = await prisma.games.findUnique({
            where: { id: gameIdNumber },
        });

        if (!game) {
            return res.status(404).json({ error: "Game not found"})
        }


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
    // on ajoute le try catch parce que si y'a un erreur du bdd, serveur ne tombe pas
    try{
        const guideId = Number(req.params.id);

        if (isNaN(guideId)) {
            return res.status(400).json({ error: "Invalid guide ID" });
        }

        const guide = await prisma.guides.findUnique({
            where: { id: guideId },
        });

        if (!guide) {
            return res.status(404).json({ error: "Guide not found"})
        }

        if (guide.user_id !== req.user.id) {
            return res.status(403).json({error: "Not allowed to delete this guide"})
        }

        await prisma.guides.delete({
            where: { id: guideId }
        })

        res.status(200).json({
            status: "Success",
            message: "Guide removed",
        });
    }catch{
        console.error("Delete Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export { getGuidesByGame, createGuide, deleteGuide, updateGuide, getSingleGuide };