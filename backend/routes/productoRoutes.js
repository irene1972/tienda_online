import express from 'express';
import {
    prueba
} from '../controllers/productoController.js';

const router=express.Router();

router.get('/',prueba);

export default router;