import bcrypt from "bcrypt";

import { prisma } from "../config/db.js";


export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, display_name, email, bio, password } = req.body;

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

        // 4. File uploads : si des fichiers sont présents, on ajoute leurs noms à updateData
        if (req.files) {
            if (req.files['avatar']) {
                updateData.avatar = req.files['avatar'][0].filename;
            }
            if (req.files['cover']) {
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
            message: "Success",
            user: updatedUser
        });

    } catch (error) {
        console.error("Prisma Error:", error);
        res.status(500).json({ message: "Error", error: error.message });
    }
};