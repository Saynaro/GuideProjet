
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 On commence a ajouter des donnes...");

  const newUser = await prisma.users.create({
    data: {
      username: "Sainaro",
      email: "test@example.com",
      password: "hashed_password_here",    //  bcrypt!
      bio: "Premiere gamer and guide creator",
      // Creeate a guide with a game in one step
      guides: {
        create: {
          title: "Comment réussir dans les jeux vidéo",
          content: "Il suffit de continuer à progresser!",
          games: {
            create: {
              title: "SilkSong",
              description: "Jeu difficile mais très amusant"
            }
          }
        }
      }
    },
  });

  console.log("✅ User et guide créés:", newUser.username);
}

main()
  .catch((e) => console.error("❌ Erreur:", e))
  .finally(() => prisma.$disconnect());




  

  //npx prisma studio - для просмотра базы данных в браузере