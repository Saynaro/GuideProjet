import express from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";

const prisma = new PrismaClient();
const app = express();

const upload = multer({ dest: "uploads/" });

app.post("/guides", upload.single("image"), async (req, res) => {
  try {
    const { content, gameId, userId } = req.body;

    const newGuide = await prisma.guides.create({
      data: {
        title: "Mon guide",
        content: content,
        user_id: parseInt(userId),
        game_id: parseInt(gameId),
      }
    });

    res.json(newGuide);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
