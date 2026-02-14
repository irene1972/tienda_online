import express from 'express';
import {
    envioEmail,
    getUsers,
    insertUser
} from '../controllers/usuarioController.js';

const router=express.Router();

router.get('/enviar-email',envioEmail);
router.get('/listar',getUsers);
router.post('/',insertUser);

export default router;