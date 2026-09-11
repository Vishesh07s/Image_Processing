import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

// Resolve `.env` from this file instead of the process working directory. This
// also works when the server is started from `src/` (for example, `node server.js`).
dotenv.config({ path: fileURLToPath(new URL("../../.env", import.meta.url)) });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing. Add it to the project root .env file.");
}

const databaseConfig = new URL(databaseUrl);

if (!databaseConfig.password) {
  throw new Error(
    "DATABASE_URL must include a password. URL-encode special characters in it (for example, @ as %40).",
  );
}

const Pool = pg.Pool;

const pool = new Pool({
  connectionString: databaseUrl,
});

export default pool;
