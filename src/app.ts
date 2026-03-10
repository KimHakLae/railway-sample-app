import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import notesRoutes from "./routes/notesRoutes";
import adminRoutes from "./routes/adminRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import itemRoutes from "./routes/itemRoutes";

const app = express();

// CORS - 프론트 URL 허용
app.use(cors({ origin: "*" }))
app.use(express.json());

app.use("/notes", notesRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/item", itemRoutes);
app.use("/inventory", inventoryRoutes);

app.use(errorHandler);

export default app;