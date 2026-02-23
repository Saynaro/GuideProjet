const { defineConfig } = require('@prisma/config');

module.exports = defineConfig({
  
  // settings for Migrate, Studio и т.д.
  schema: 'prisma/schema.prisma',

  // settings for connecting to the database
  datasource: {
    url: process.env.DATABASE_URL,
  },
  // Define the type of engine for resolve the error "Error: No Prisma Client engine specified"
  engine: {
    kind: 'library', // Utilise par défaut, mais peut être changé en 'binary' si nécessaire
                      // 'library' est généralement plus rapide et plus facile à gérer, surtout dans les environnements de développement et de production modernes.
                      //  'binary' peut être nécessaire dans certains cas spécifiques, mais il est moins courant.
  },
});
