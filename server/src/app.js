

//// IN APP.JS WE CREATE THE EXPRESS AND DEFINE THE ROUTES FOR THE APP ////

import express from "express";
import afficheJeuxRoutes from "./routes/afficheJeuxRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/jeux", afficheJeuxRoutes);

export default app;

//// IN APP.JS WE CREATE THE EXPRESS AND DEFINE THE ROUTES FOR THE APP ////





    // В server.js мы запускаем сервер и подключаемся к базе данных
import { config } from "dotenv";
config(); // загружаем переменные из .env

import app from "./app.js";
import { connectDB, disconnectDB } from "./config/db.js";

// Подключаемся к базе данных перед запуском сервера
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown при закрытии процесса
    process.on("SIGINT", async () => {
      console.log("Stopping server...");
      await disconnectDB();
      server.close(() => {
        console.log("Server stopped");
        process.exit(0);
      });
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);        // Завершаем процесс с ошибкой, если не удалось подключиться к базе данных
                            // Это важно, чтобы не запускать сервер без подключения к базе данных
                            // 1 - это стандартный код ошибки для общего сбоя, вы можете использовать другие коды ошибок по своему усмотрению
  });
  // В server.js мы запускаем сервер и подключаемся к базе данных

















          ///// EXEMPLE OF GET USERS FROM DB WITH PRISMA /////
const express = require('express');
const prisma = require('./config/db.js'); // Импортируем наш настроенный клиент из db.js
const app = express();

app.use(express.json()); // Чтобы сервер понимал JSON в запросах

// Пример роута: Получить всех пользователей
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении пользователей" });
  }
});

// Тот самый listen
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});