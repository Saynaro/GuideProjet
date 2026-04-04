import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"   // If in development, log queries, errors, and warnings
      ? ['query', 'error', 'warn']              // If in production, only log errors
      : ['error'],                              // utile for debugging and monitoring database interactions during development
});

const connectDB = async () => {
  try {
    await prisma.$connect();      // Attempt to connect to the database
    console.log("DataBase connected via prisma!");
  } catch (error) {
    console.log(`DataBase connection error: ${error.message}`);  // Log the error message if the database connection fails
    process.exit(1);          // Exit the process with a failure code if the database connection fails
  };
};

const disconnectDB = async () => {
  await prisma.$disconnect();
}


export { prisma, connectDB, disconnectDB }