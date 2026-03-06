import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import notesRoutes from "./routes/notesRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/notes", notesRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;