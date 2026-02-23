"# ProjetGuide" 



// EXEMPLE OF CONNECTION SERVER

import  express  from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { guidesPath } from "./config/pathsAddPhoto.js";
import { avatarsPath, coversPath } from "./config/pathsAddAvatar.js";


import { connectDB, disconnectDB } from "./config/db.js";


import authRoutes from "./routes/authRoutes.js"
import afficheJeuxRoutes from "./routes/afficheJeuxRoutes.js" 
import guideRoutes from "./routes/guideRoutes.js";
import userRoutes from "./routes/usersRoutes.js"




config();     // tells the app to read the .env file and load the environment variables
connectDB();

const app = express();    // Create an instance of the Express application

// app.use(express.static(path.join(process.cwd(), 'client')));

app.use(cookieParser());


app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"], 
  credentials: true,  // Permet de envoyer des cookies
}));


app.use(express.json());  // Middleware to parse JSON bodies from incoming requests
app.use(express.urlencoded({ extended: true }));      // Middleware to parse URL-encoded bodies (like form submissions)
// app.use(cookieParser()); // pour que le server peux lire res.cookie("jwt")



// In server file we use general route like "/auth" and in route file we use exact route like "/register" or "/login"
// exemple: http://localhost:5001/auth/register
app.use("/auth", authRoutes);       // All routes defined in authRoutes will be prefixed with /auth

// exemple: http://localhost:5001/main/afficheJeux
app.use("/main", afficheJeuxRoutes);

app.use("/guides", guideRoutes);

//  Afficher des photos des guides
app.use('/assets/guides', express.static(guidesPath));
app.use('/assets/avatars', express.static(avatarsPath));
app.use('/assets/covers', express.static(coversPath));

app.use("/users", userRoutes);


const PORT = 5001;



app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});

