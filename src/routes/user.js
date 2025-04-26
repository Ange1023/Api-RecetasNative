import express from 'express';
import UserController from '../controllers/User.js';

const router = express.Router();

// CRUD Básico (heredado de BaseController)
router.get('/all',UserController.getAll)    
router.route('/')
    .post(UserController.create);  // POST /users

router.route('/:id')
    .get(UserController.getOne)    // GET /users/:id
    .patch(UserController.update)  // PATCH /users/:id
    .delete(UserController.delete); // DELETE /users/:id

    console.log(typeof UserController.getAll);
    

export default router;