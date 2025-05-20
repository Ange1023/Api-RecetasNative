import express from "express";
import CategoryController from "../controllers/categoryController.js";
import { verifyToken } from "../services/authService.js";

const router = express.Router();

// si el middleware se crea antes de las otras rutas, se ejecutara para todas las rutas
//router.use(verifyToken); // Middleware de autenticación

// CRUD Básico (heredado de BaseController)

router.get("/all",CategoryController.getAll)
router.post("/",CategoryController.create)
router.delete("/:id",CategoryController.delete)

export default router;

