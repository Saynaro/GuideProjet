import  express  from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { guidesPath } from "./config/pathsAddPhoto.js";
import { avatarsPath } from "./config/pathsAddAvatar.js";
import { coversPath } from "./config/pathsAddCover.js";


import { connectDB, disconnectDB } from "./config/db.js";


import authRoutes from "./routes/authRoutes.js"
import afficheJeuxRoutes from "./routes/afficheJeuxRoutes.js" 
import guideRoutes from "./routes/guideRoutes.js";
import userRoutes from "./routes/usersRoutes.js"
import accountRoutes from "./routes/accountRoutes.js";




config();     // tells the app to read the .env file and load the environment variables
connectDB();

const app = express();    // Create an instance of the Express application

// app.use(express.static(path.join(process.cwd(), 'client')));

app.use(cookieParser());


app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? false // In production,  If front and back in one domain, we put "false" or site adresse
    : ["http://127.0.0.1:5500", "http://localhost:5500"], 
  credentials: true,
}));
//Si je laisse le paramètre en mode développement, CORS n'autorisera que les requêtes provenant de l'ordinateur local (localhost).
//Si je le définisse en mode production, la condition « false » sera activée (ou je pourrai saisir l'adresse site dans Render). Ceci est essentiel pour la communication entre le frontend et le backend dans le cloud.


// Middleware pour désactiver le cache sur toutes les réponses;
// si je veux retourner sur la page precedent apres login pour ne pas afficher le page main
// app.use((req, res, next) => {
//     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
//     next();
// });

app.use(express.json());  // Middleware to parse JSON bodies from incoming requests
app.use(express.urlencoded({ extended: true }));      // Middleware to parse URL-encoded bodies (like form submissions)
// app.use(cookieParser()); // pour que le server peux lire res.cookie("jwt")



// In server file we use general route like "/auth" and in route file we use exact route like "/register" or "/login"
// exemple: http://localhost:5001/auth/register
app.use("/auth", authRoutes);       // All routes defined in authRoutes will be prefixed with /auth

// exemple: http://localhost:5001/main/afficheJeux
app.use("/main", afficheJeuxRoutes);

app.use("/guides", guideRoutes);

app.use("/account", accountRoutes);

//  Afficher des photos des guides
app.use('/assets/guides', express.static(guidesPath));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/assets/avatars', express.static(avatarsPath));
app.use('/assets/covers', express.static(coversPath));

app.use("/users", userRoutes);


const PORT = process.env.PORT || 5001;


// Define the frontend folder path (projet/client)
const clientPath = path.join(process.cwd(), "..", "client");

// Envoie static files of frontend
app.use(express.static(clientPath));

//route for the root URL, which sends the login.html file to the client
app.get("/", (req, res) => {
    res.sendFile(path.join(clientPath, "login.html"));
});
// All the demandes, which don't match with API-routes, envoie to main.html
// app.get("*", (req, res) => {
//     res.sendFile(path.join(clientPath, "main.html"));
// });

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
