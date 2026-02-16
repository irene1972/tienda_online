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

const listarProductosPorCategoria = async (req, res) => {
    try {
        const id=req.params.id;
        const producto = new Producto();
        const resultado = await producto.getProductosPorCategoria(id);
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

const obtenerProducto = async (req, res) => {
    const id = req.params.id;
    const producto = new Producto();
    try {
        const resultado = await producto.getProductoById(id);
        if (resultado) {
            res.json(resultado[0][0]);
        } else {
            return res.status(500).json({ error: 'Error al consultar el dato en la bd' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar el dato' });
    }
}

const insertarProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock, oferta, categoria } = req.body;
    const { filename } = req.file;
    try {
        const producto = new Producto(categoria, nombre, descripcion, precio, stock, oferta, filename);

        const resultado = await producto.insertProducto();
        if (resultado) {
            res.json({ mensaje: 'Producto insertado correctamente' });
        } else {
            return res.status(500).json({ error: 'Error al insertar los datos en la bd' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al insertar los datos' });
    }
}

const actualizarProducto = async (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, precio, stock, oferta, categoria } = req.body;
    if (req.file) {
        try {
            const { filename } = req.file;
            const producto = new Producto(categoria, nombre, descripcion, precio, stock, oferta, filename);
            const response = await producto.updateProductWithImage(id);
            if (response) {
                res.json({ mensaje: 'Producto actualizado correctamente' });
            }
            else {
                return res.status(500).json({ error: 'Error al actualizar los datos en la bd' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Error al actualizar los datos' });
        }
    } else {
        try {
            const producto = new Producto(categoria, nombre, descripcion, precio, stock, oferta);
            const response = await producto.updateProduct(id);
            if (response) {
                res.json({ mensaje: 'Producto actualizado correctamente' });
            }
            else {
                return res.status(500).json({ error: 'Error al actualizar los datos en la bd' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Error al actualizar los datos' });
        }
    }


}

const deleteProducto = async (req, res) => {
    try {
        const producto = new Producto();
        const response = await producto.deleteProduct(req.params.id);
        if (response) {
            res.json({mensaje:'Producto eliminado correctamente'});
        } else {
            return res.status(500).json({ error: 'Error al eliminar el producto de la bd' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar el producto' });
    }
}
export {
    listarProductos,
    listarProductosPorCategoria,
    obtenerProducto,
    insertarProducto,
    actualizarProducto,
    deleteProducto
}