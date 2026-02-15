import express from 'express';
import {
    listarProductos,
    obtenerProducto,
    insertarProducto,
    actualizarProducto,
    deleteProducto
} from '../controllers/productoController.js';
import upload from '../helpers/upload.js';

const router = express.Router();

router.get('/listar', listarProductos);
router.get('/obtener/:id', obtenerProducto);
router.post('/crear', upload.single('imagen'), insertarProducto);
router.put('/editar/:id', upload.single('imagen'), actualizarProducto);
router.delete('/borrar/:id', deleteProducto);

export default router;