import dotenv from "dotenv"; //load environmnet variables.
import pg from "pg";

dotenv.config();

const { Pool, types } = pg;

// Return Date columns (OID 1082) as plain "YYY-MM-DD" strings instead of JS Date
// so JOSN serialization doesn't UTC-shift the date for clients in non-UTC timezones.
types.setTypeParser(1082, (val) => val);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on("connect", () => {
  console.log("Connected to Neon Postgres");
});

pool.on("error", (err) => {
  console.log("Unexpected Postgres error:", err);
  process.exit(-1);
});

export default pool;
