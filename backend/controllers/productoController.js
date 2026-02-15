import { Producto } from '../models/Producto.js';

const listarProductos = async (req, res) => {
    try {
        const producto = new Producto();
        const resultado = await producto.getProductos();
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

const insertarProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock, oferta, categoria } = req.body;
    const { filename } = req.file;
    try {
        const producto = new Producto(categoria, nombre, descripcion, precio, stock, oferta, filename);
        
        const resultado = await producto.insertProducto();
        if (resultado) {
            res.json({mensaje:'Producto insertado correctamente'});
        } else {
            return res.status(500).json({ error: 'Error al insertar los datos en la bd' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al insertar los datos' });
    }

    res.json({ ok: true });
}

export {
    listarProductos,
    insertarProducto
}