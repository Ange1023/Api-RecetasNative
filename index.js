import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/user.js";
import authRoutes from "./src/routes/authentication.js";
import database from "./src/database/database.js";
import { errorMiddleware } from "./src/utils/AppError.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/auth", authRoutes);

// Middleware de errores (si algo falla, pasa a errorMiddleware)
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} http://localhost:${PORT}`);
});

process.on ("SIGINT", () => {
    database.disconnect();
    process.exit(0);
}
)
