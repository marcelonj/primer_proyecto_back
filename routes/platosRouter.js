// routes/platosRouter.js
import express from 'express';
import platosController from '../controllers/platosController.js';

const router = express.Router();

router.get('/', platosController.listarPlatos);           // listar todos los platos
router.get('/nuevo', platosController.formularioNuevoPlato); // mostrar form nuevo plato
router.post('/nuevo', platosController.guardarNuevoPlato);   // procesar alta

export default router;
