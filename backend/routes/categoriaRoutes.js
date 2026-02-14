import express from 'express';
import {
    obtenerCategorias,
    insertarCategoria
} from '../controllers/categoriaController.js';

const router = express.Router();

router.get('/listar', obtenerCategorias);
router.post('/crear', insertarCategoria);

export default router;