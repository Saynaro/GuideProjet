const prisma = require('./src/config/db');

async function test() {
  try {
    // essayer de faire une requete pour voir si la connexion à la base de données fonctionne
    const count = await prisma.users.count();
    console.log('✅ Prisma works!');
    console.log(`📊 quantity of users in database: ${count}`);
  } catch (e) {
    console.error('❌ Erreur:');
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

test();