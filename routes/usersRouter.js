import express from 'express';
const usersRouter = express.Router();
import usersController from '../controllers/usersController.js';

usersRouter.post('/nuevo', usersController.registrarUsuario);
usersRouter.get('/nuevo', usersController.mostrarFormularioNuevoUsuario);

export default usersRouter;