import express from "express";
import GroupController from "../controllers/groupController.js";
import { verifyToken } from "../services/authService.js";

const router = express.Router();

// si el middleware se crea antes de las otras rutas, se ejecutara para todas las rutas
//router.use(verifyToken); // Middleware de autenticación

// CRUD Básico (heredado de BaseController)

router.get("/all", GroupController.getAll);
router.post("/", GroupController.create);
router.get("/paginate", GroupController.getPaginated);
router.post("/toggleMember", GroupController.toggleMember);
router.delete("/softDelete/:id", GroupController.softDelete);

router.route("/:id")
    .delete(GroupController.delete)
    .put(GroupController.update)
    .get(GroupController.getOne);

export default router;