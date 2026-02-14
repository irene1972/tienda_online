import { Categoria } from "../models/Categoria.js";

const obtenerCategorias = async (req, res) => {
    try {
        const categoria = new Categoria();
        const resultado = await categoria.getCategorias();
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

const insertarCategoria = async (req, res) => {
    const {nombre}=req.body;
    try {
        const categoria=new Categoria(nombre);
        const resultado=await categoria.insertCategory();
        if(resultado){
            res.json({mensaje:'Categoría creada correctamente'});
        }else{
            return res.status(500).json({ error: 'Error al insertar los datos en la bd' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al insertar los datos' });
    }
}

export {
    obtenerCategorias,
    insertarCategoria
}