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

export {
    listarProductos
}