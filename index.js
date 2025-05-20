import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import recipeRoutes from "./src/routes/recipeRoutes.js";
import database from "./src/database/database.js";
import { errorMiddleware } from "./src/utils/AppError.js";
dotenv.config();
console.log(process.env.API_RECETAS_NATIVE_MONGODB_URI);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/recipe", recipeRoutes);

// Middleware de errores (si algo falla, pasa a errorMiddleware)
app.use(errorMiddleware);

const PORT = process.env.API_RECETAS_NATIVE_PORT
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} http://localhost:${PORT}`);
});

process.on ("SIGINT", () => {
    database.disconnect();
    process.exit(0);
}
)
