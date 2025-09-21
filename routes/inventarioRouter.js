import express from 'express';
import inventarioController from '../controllers/inventarioController.js';

const router = express.Router();

router.get('/', inventarioController.mostrarInventario);
router.get('/nuevo', inventarioController.formularioNuevoInventario);
router.post('/nuevo', inventarioController.guardarInventario);
router.delete('/eliminar/:id', inventarioController.eliminarInventario);

export default router;

/*
Problema con HTML y DELETE:
Los formularios HTML nativos solo soportan GET y POST.
Para poder usar DELETE desde un formulario,
necesitás method-override
o enviar la petición desde fetch/JS.
*/