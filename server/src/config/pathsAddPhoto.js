import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Filepath to guides est le chemin vers le dossier où les images des guides seront stockées.
// Il faut que ce chemin soit le même que celui dans le client pour que les images soient affichées correctement
export const guidesPath = path.resolve(__dirname, "../../../client/assets/guides");

