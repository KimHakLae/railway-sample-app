import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { json } from "body-parser"

dotenv.config()

const app = express()
app.use(json())

// Railway 동적 포트
const PORT = process.env.PORT || 3000

// CORS - 프론트 URL 허용
app.use(cors({ origin: "*" }))

// 예시 라우트
app.get("/notes", (req, res) => {
  res.json([{ id: 1, title: "Hello", content: "World" }])
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})