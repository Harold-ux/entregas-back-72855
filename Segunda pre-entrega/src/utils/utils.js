// src/utils/utils.js
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Determinar __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ajustar `__dirname` para que apunte a la carpeta raíz `src`
const rootDir = join(__dirname, "..", "..");

export { __dirname, rootDir };
