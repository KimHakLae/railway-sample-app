import dotenv from "dotenv"
import { json } from "body-parser"
import app from "./app"

dotenv.config()

// const app = express()
app.use(json())

// Railway 동적 포트
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})