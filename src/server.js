import app from "./app.js";
import pool from "./config/db.js";

const PORT = 3000;

async function testDb() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database Connected: ", result.rows[0]);
  } catch (err) {
    console.error("Database connection failed: ", err.message);
  }
}
testDb();

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
