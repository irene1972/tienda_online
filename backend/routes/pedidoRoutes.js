import express from 'express';
import {
    listarPedidos,
    obtenerPedidoPorId,
    listarPedidoPorUsuario,
    ultimoPedidoPorUsuario,
    insertarPedido,
    confirmarPedido
} from '../controllers/pedidoController.js';

const router = express.Router();

router.get('/', listarPedidos);
router.get('/confirmado/:usuario_id/:pedido_id', ultimoPedidoPorUsuario);
router.get('/mis-pedidos/:usuario_id', listarPedidoPorUsuario);
router.get('/detalle/:id', obtenerPedidoPorId);
router.post('/crear', insertarPedido);
router.put('/confirmado', confirmarPedido);

export default router;