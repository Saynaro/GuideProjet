import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// exit from server/src/config to server/
const rootPath = path.join(__dirname, "../../");

// right folder for saving photos: server/client/assets/guides
export const coversPath = path.join(rootPath, "client", "assets", "covers");

// if the folder doesn't exist, create it
if (!fs.existsSync(coversPath)) {
    fs.mkdirSync(coversPath, { recursive: true });
}

console.log("Saving to:", coversPath);