import express from 'express';
import {
    listarProductos
} from '../controllers/productoController.js';

const router=express.Router();

router.get('/listar',listarProductos);

export default router;