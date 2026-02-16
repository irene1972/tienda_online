import express from 'express';
import {
    ultimoPedidoPorUsuario,
    insertarPedido
} from '../controllers/pedidoController.js';

const router = express.Router();

router.get('/confirmado/:usuario_id/:pedido_id', ultimoPedidoPorUsuario);
router.post('/crear', insertarPedido);

export default router;