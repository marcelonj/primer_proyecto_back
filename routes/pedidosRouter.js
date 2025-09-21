import express from 'express';
import pedidosController from '../controllers/pedidosController.js';

const router = express.Router();

router.get('/', pedidosController.mostrarPedidos);
router.get('/nuevo', pedidosController.formularioNuevoPedido);
router.post('/nuevo', pedidosController.guardarPedido);
router.delete('/eliminar/:id', pedidosController.eliminarPedidos);
router.put('/modificar', pedidosController.modificarPedidos);

export default router;

/*
Problema con HTML y DELETE:
Los formularios HTML nativos solo soportan GET y POST.
Para poder usar DELETE desde un formulario,
necesitás method-override
o enviar la petición desde fetch/JS.
*/