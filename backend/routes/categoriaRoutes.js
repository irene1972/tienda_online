import express from 'express';
import {
    prueba
} from '../controllers/categoriaController.js';

const router=express.Router();

router.get('/',prueba);

export default router;