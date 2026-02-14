import express from 'express';
import {
    envioEmail,
    getUsers,
    insertUser,
    login
} from '../controllers/usuarioController.js';

const router=express.Router();

router.get('/enviar-email',envioEmail);
router.get('/listar',getUsers);
router.post('/',insertUser);
router.post('/login',login);

export default router;