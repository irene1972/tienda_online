import express from 'express';
import multer from 'multer';
import {
    listarProductos,
    insertarProducto
} from '../controllers/productoController.js';
import upload from '../helpers/upload.js';

const router=express.Router();

//const upload = multer({ dest: 'uploads/' });

router.get('/listar',listarProductos);
router.post('/crear',upload.single('imagen'),insertarProducto);

export default router;