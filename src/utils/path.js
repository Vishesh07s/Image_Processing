import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");
console.log(projectRoot);
const uploadsPath = path.join(projectRoot, "uploads");
console.log(uploadsPath);
const processedPath = path.join(projectRoot, "processed");

export { projectRoot, uploadsPath, processedPath };
