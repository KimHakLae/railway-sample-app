import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import notesRoutes from "./routes/notesRoutes";
import adminRoutes from "./routes/adminRoutes";
import ingredientRoutes from "./routes/ingredientRoutes";
import stockRoutes from "./routes/stockRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
// CORS - 프론트 URL 허용
app.use(cors({ origin: "*" }))
app.use(express.json());

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ingredients/types", ingredientRoutes);
app.use("/api/ingredients/stocks", stockRoutes);
app.use("/api/recipes", recipeRoutes);

app.use(errorHandler);

export default app;