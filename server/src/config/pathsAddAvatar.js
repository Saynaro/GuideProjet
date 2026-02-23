// pathsAddAvatar.js
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// la route absolute sur avatars
export const avatarsPath = path.resolve(__dirname, "../../../client/assets/avatars");
export const coversPath = path.resolve(__dirname, "../../../client/assets/covers");