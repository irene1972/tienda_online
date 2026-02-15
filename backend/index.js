import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import usuarioRoutes from './routes/usuarioRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import productoRoutes from './routes/productoRoutes.js';

const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
};

const app=express();

app.use(express.json());

app.use(cors(corsOptions));

dotenv.config();

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/usuarios',usuarioRoutes);
app.use('/api/categorias',categoriaRoutes);
app.use('/api/pedidos',pedidoRoutes);
app.use('/api/productos',productoRoutes);

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});