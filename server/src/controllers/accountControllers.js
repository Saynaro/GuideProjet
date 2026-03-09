import bcrypt from "bcrypt";

import { prisma } from "../config/db.js";

import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

// definir le directory actuel pour pouvoir supprimer les fichiers d'avatar et de cover lors de la suppression du profil
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, display_name, email, bio, password } = req.body;


        const currentUser = await prisma.users.findUnique({
            where: { id: userId }
        });

        if (!currentUser) {
            return res.status(404).json({ message: "User n'est pas trouvé" });
        }

        // 1. Creeons un objet pour stocker les champs à mettre à jour
        const updateData = {};

        // 2. Verifions chaque champ et ne l'ajoutons à updateData que s'il est présent et non vide
        if (username && username.trim() !== "") updateData.username = username;
        if (display_name && display_name.trim() !== "") updateData.display_name = display_name;
        if (email && email.trim() !== "") updateData.email = email;
        if (bio && bio.trim() !== "") updateData.bio = bio;

        // 3. Logique spéciale pour le mot de passe : s'il est fourni, on le hash avant de l'ajouter à updateData
        if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }



        if (req.files) {
            // Path: from server/src/controllers exit to 2 levels up to server, then go to client/assets
            const baseAssetsPath = path.join(__dirname, "..", "..", "client", "assets");

        // avatar   modification
        if (req.files['avatar']) {

            // If user had an avatar, delete the old one from disc
            if (currentUser.avatar) {

                const oldAvatarPath = path.join(baseAssetsPath, "avatars", currentUser.avatar);

                // .catch() use, because code don't "bug", if file doesn't exists in disk
                await fs.unlink(oldAvatarPath).catch(() => console.log("The old avatar not find"));
            }
            updateData.avatar = req.files['avatar'][0].filename;
        }

        // Covers modidication (Cover)
        if (req.files['cover']) {
                // If user had cover, delete the old one
                if (currentUser.cover) {
                    
                    const oldCoverPath = path.join(baseAssetsPath, "covers", currentUser.cover);

                    await fs.unlink(oldCoverPath).catch(() => console.log("The cover don't find in disc"));
                }
                    updateData.cover = req.files['cover'][0].filename;
            }
        }


        // 5. Si l'utilisateur n'a fourni aucun champ à mettre à jour, on retourne une erreur
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "Aucune donnée à mettre à jour" });
        }

        // 6. Prisma update : on met à jour uniquement les champs présents dans updateData
        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: updateData,
        });

        res.status(200).json({
            message: "Profil mis à jour avec succès",
            user: updatedUser
        });

    } catch (error) {
        // Prisma unique constraint error
        // P2002 : Unique constraint failed on the field: `field_name`
        if (error.code === "P2002") {

            const field = error.meta?.target?.[0];
            // meta.target est un array des champs en conflit, mais ici, on suppose qu'il n'y en a qu'un seul, donc on prend le premier.

            if (field === "username") {
                return res.status(400).json({
                    message: "Ce nom d'utilisateur est déjà utilisé"
                });
            }

            if (field === "email") {
                return res.status(400).json({
                    message: "Cet email est déjà utilisé"
                });
            }

            return res.status(400).json({
                message: "Cette valeur est déjà existante"
            });
        }

        console.error("Prisma Error:", error);

        res.status(500).json({
            message: "Erreur du serveur"
        });
        }
};




export const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await prisma.users.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Path: exit from controllers (..), exit from src (..), go to client/assets
        const baseAssetsPath = path.join(__dirname, "..", "..", "client", "assets");

        // les fichiers à supprimer : avatars et covers. On construit leur chemin complet et on les supprime du disque.
        const files = [
            { name: user.avatar, folder: "avatars" },
            { name: user.cover, folder: "covers" }
        ];

        for (const file of files) {
            if (file.name) {
                const filePath = path.join(baseAssetsPath, file.folder, file.name);
                
                // .catch() pour éviter que l'erreur de fichier non trouvé arrête tout le processus de suppression du profil, car il se peut que le fichier ait déjà été supprimé ou n'ait jamais existé.
                await fs.unlink(filePath).catch(() => console.log(`File ${file.name} already gone`));
            }
        }

        await prisma.users.delete({
            where: { id: userId },
        });

        res.status(200).json({
            message: "Profil supprimé avec succès",
        });

    } catch (error) {
        console.error("Prisma Error:", error);
        res.status(500).json({ message: "Error", error: error.message });
    }
};