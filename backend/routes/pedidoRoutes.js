import express from 'express';
import {
    obtenerPedidoPorId,
    listarPedidoPorUsuario,
    ultimoPedidoPorUsuario,
    insertarPedido
} from '../controllers/pedidoController.js';

const router = express.Router();

router.get('/confirmado/:usuario_id/:pedido_id', ultimoPedidoPorUsuario);
router.get('/mis-pedidos/:usuario_id', listarPedidoPorUsuario);
router.get('/detalle/:id', obtenerPedidoPorId);
router.post('/crear', insertarPedido);

export default router;