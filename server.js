require("dotenv").config();
const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// DB 테이블 생성
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL
    )
  `);
}
initDB();

// 기본 확인
app.get("/", (req, res) => {
  res.send("🚀 Railway Fullstack Test Server Running");
});

// 전체 조회
app.get("/notes", async (req, res) => {
  const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
  res.json(result.rows);
});

// 생성
app.post("/notes", async (req, res) => {
  const { content } = req.body;
  const result = await pool.query(
    "INSERT INTO notes (content) VALUES ($1) RETURNING *",
    [content]
  );
  res.json(result.rows[0]);
});

// 삭제
app.delete("/notes/:id", async (req, res) => {
  await pool.query("DELETE FROM notes WHERE id = $1", [req.params.id]);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});