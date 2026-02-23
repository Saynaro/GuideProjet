"# ProjetGuide" 





const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log("⏳ Проверка подключения к базе...");
    
    // 1. Пробуем найти одного любого пользователя
    const user = await prisma.users.findFirst({
      include: {
        _count: {
          select: { 
            followers: true, 
            following: true,
            guides: true 
          }
        }
      }
    });
    
    if (!user) {
      console.log("❌ Пользователи не найдены. База пуста?");
    } else {
      console.log("✅ Подключение успешно!");
      console.log(`Пользователь: ${user.username}`);
      console.log(`Подписчиков: ${user._count.followers}`);
      console.log(`Подписан на: ${user._count.following}`);
      console.log(`Создано гайдов: ${user._count.guides}`);
    }
  } catch (error) {
    console.error("❌ Ошибка при запросе к базе:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();