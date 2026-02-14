import express from 'express';
import {
    obtenerCategorias
} from '../controllers/categoriaController.js';

const router=express.Router();

router.get('/listar',obtenerCategorias);

export default router;