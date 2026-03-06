import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import notesRoutes from "./routes/notesRoutes";

const app = express();

// CORS - 프론트 URL 허용
app.use(cors({ origin: "*" }))
app.use(express.json());

app.use("/notes", notesRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;