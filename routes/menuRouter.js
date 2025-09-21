import express from 'express';
import menuController from '../controllers/menuController.js';

const router = express.Router();

router.get('/', menuController.mostrarMenu);

export default router;