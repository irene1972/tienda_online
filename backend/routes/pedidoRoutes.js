import express from 'express';
import {
    listarPedidos,
    obtenerPedidosPorId,
    obtenerPedidosPorCoste,
    obtenerPedidosPorFecha,
    obtenerPedidosPorEmail,
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
router.get('/find-by-id/:id', obtenerPedidosPorId);
router.get('/find-by-coste/:coste', obtenerPedidosPorCoste);
router.get('/find-by-fecha/:fecha', obtenerPedidosPorFecha);
router.get('/find-by-email/:email', obtenerPedidosPorEmail);
router.post('/crear', insertarPedido);
router.put('/confirmado', confirmarPedido);

export default router;