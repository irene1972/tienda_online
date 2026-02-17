import { LineaPedido } from "../models/LineaPedido.js";
import { Pedido } from "../models/Pedido.js";

const listarPedidos = async (req, res) => {

    try {
        const pedido = new Pedido();
        const resultado = await pedido.getPedidos();
        //console.log(resultado);
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

const obtenerPedidosPorId = async (req, res) => {

    try {
        const pedido = new Pedido();
        const resultado = await pedido.getPedidosById(req.params.id);
        //console.log(resultado);
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

const obtenerPedidosPorCoste = async (req, res) => {
    try {
        const pedido = new Pedido();
        const resultado = await pedido.getPedidosByCoste(req.params.coste);
        //console.log(resultado);
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

const obtenerPedidosPorFecha = async (req, res) => {

    try {
        const pedido = new Pedido();
        const resultado = await pedido.getPedidosByFecha(req.params.fecha);
        //console.log(resultado);
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

const obtenerPedidosPorEmail = async (req, res) => {

    try {
        const pedido = new Pedido();
        const resultado = await pedido.getPedidosByEmail(req.params.email);
        //console.log(resultado);
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

const obtenerPedidoPorId = async (req, res) => {

    try {
        const pedido = new Pedido();
        const resultado = await pedido.getPedidoJoinById(req.params.id);
        //console.log(resultado);
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

const listarPedidoPorUsuario = async (req, res) => {

    try {
        const pedido = new Pedido();
        const resultado = await pedido.getPedidosByUser(req.params.usuario_id);
        //console.log(resultado);
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

const ultimoPedidoPorUsuario = async (req, res) => {

    try {
        const pedido = new Pedido();
        const resultado = await pedido.getLastPedidoByUser(req.params.usuario_id, req.params.pedido_id);
        //console.log(resultado);
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

const insertarPedido = async (req, res) => {
    const { usuario_id, provincia, ciudad, direccion, coste, estado, carrito } = req.body;
    try {
        const pedido = new Pedido(usuario_id, provincia, ciudad, direccion, coste, estado);

        const resultado = await pedido.insertPedido();

        if (resultado) {
            const pedido_id = resultado[0].insertId;

            for (const elem of carrito) {
                const lineaPedido = new LineaPedido(pedido_id, elem.producto.id, elem.cantidad);
                await lineaPedido.insertLineaPedido();
            }

            res.json({ mensaje: 'Pedido insertado correctamente', pedido_id: pedido_id });
        } else {
            return res.status(500).json({ error: 'Error al insertar los datos en la bd' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al insertar los datos' });
    }
}

const confirmarPedido = async (req, res) => {
    const pedido = new Pedido(req.params.datos.pedido);
    try {
        const resultado = await pedido.confirmPedido();
        if (resultado) {
            res.json({ mensaje: 'Pedido confirmado correctamente' });
        } else {
            return res.status(500).json({ error: 'Error al actualizar los datos en la bd' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar los datos' });
    }
}

export {
    listarPedidos,
    obtenerPedidosPorId,
    obtenerPedidosPorCoste,
    obtenerPedidosPorFecha,
    obtenerPedidosPorEmail,
    obtenerPedidoPorId,
    listarPedidoPorUsuario,
    ultimoPedidoPorUsuario,
    insertarPedido,
    confirmarPedido
}