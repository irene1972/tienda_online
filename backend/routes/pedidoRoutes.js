import express from 'express';
import {
    insertarPedido
} from '../controllers/pedidoController.js';

const router=express.Router();

router.post('/crear',insertarPedido);

export default router;