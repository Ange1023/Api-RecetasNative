import express from "express";
import RecipeController from "../controllers/recipeController.js";
import { verifyToken } from "../services/authService.js";

const router = express.Router();

// si el middleware se crea antes de las otras rutas, se ejecutara para todas las rutas
//router.use(verifyToken); // Middleware de autenticación

// CRUD Básico (heredado de BaseController)
router.get("/all", RecipeController.getAll);
router.get("/paginated", RecipeController.getPaginated);
router.route("/").post(RecipeController.create); // POST /recipes
router
  .route("/:id") // Middleware de autenticación
  .get(RecipeController.getOne) // GET /recipes/:id
  .put(RecipeController.update) // PATCH /recipes/:id
  .delete(RecipeController.delete); // DELETE /recipes/:id

export default router;