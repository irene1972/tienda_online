import { Categoria } from "../models/Categoria.js";

const obtenerCategorias = async (req, res) => {
    try {
        const categoria=new Categoria();
        const resultado=await categoria.getCategorias();
        if(resultado){
            res.json(resultado[0]);
        }else{
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

export {
    obtenerCategorias
}