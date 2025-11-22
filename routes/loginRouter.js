import express from 'express';
const router = express.Router();
import loginController from "../controllers/loginController.js";

router.get('/', loginController.mostrarLogin);
router.post('/', loginController.login);

export default router;