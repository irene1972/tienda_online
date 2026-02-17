import pool from '../config/db.js';

export class Pedido {
    constructor(usuario_id, provincia, localidad, direccion, coste, estado = 'confirmado') {
        this.id = 0;
        this.usuario_id = usuario_id;
        this.provincia = provincia;
        this.localidad = localidad;
        this.direccion = direccion;
        this.coste = coste;
        this.estado = estado;
        this.fecha = new Date();
        this.hora = this.fecha.toTimeString().split(' ')[0];
    }

    async getPedidos() {
        try {
            const result = await pool.query(`
                SELECT pe.*, u.nombre, u.apellidos, u.email, u.rol   
                    FROM pedidos pe 
                    INNER JOIN usuarios u ON u.id=pe.usuario_id
                `);
            //console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
    }

    async getPedidosById(id) {
        try {
            const result = await pool.query(`
                SELECT pe.*, u.nombre, u.apellidos, u.email, u.rol 
                    FROM pedidos pe 
                    INNER JOIN usuarios u ON u.id=pe.usuario_id 
                    WHERE pe.id LIKE ? 
                `, [id + '%']);
            //console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
    }

    async getPedidosByCoste(coste) {
        try {
            const result = await pool.query(`
                SELECT pe.*, u.nombre, u.apellidos, u.email, u.rol 
                    FROM pedidos pe 
                    INNER JOIN usuarios u ON u.id=pe.usuario_id 
                    WHERE pe.coste LIKE ? 
                `, [coste + '%']);
            //console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
    }

    async getPedidosByFecha(fecha) {
        try {
            console.log(fecha);
            const result = await pool.query(`
                SELECT pe.*, u.nombre, u.apellidos, u.email, u.rol 
                    FROM pedidos pe 
                    INNER JOIN usuarios u ON u.id=pe.usuario_id 
                    WHERE pe.fecha = ? 
                `, [fecha]);
            //console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
    }

    async getPedidosByEmail(email) {
        try {
            const result = await pool.query(`
                SELECT pe.*, u.nombre, u.apellidos, u.email, u.rol 
                    FROM pedidos pe 
                    INNER JOIN usuarios u ON u.id=pe.usuario_id 
                    WHERE u.email LIKE ? 
                `, ['%' + email + '%']);
            //console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
    }

    async getPedidoJoinById(id) {
        try {
            const result = await pool.query(`
                SELECT pe.*,l.unidades,pr.id as producto_id,pr.nombre,pr.descripcion,pr.precio,pr.stock,pr.oferta,pr.fecha as producto_fecha,pr.imagen FROM pedidos pe
                    inner join lineas_pedidos l on l.pedido_id=pe.id
                    inner join productos pr on l.producto_id=pr.id
                    WHERE pe.id=? 
                `, [id]);
            //console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
    }
    async getLastPedidoByUser(usuario_id, pedido_id) {
        try {
            const result = await pool.query(`
                SELECT pe.*,l.unidades,pr.id as producto_id,pr.nombre,pr.descripcion,pr.precio,pr.stock,pr.oferta,pr.fecha as producto_fecha,pr.imagen FROM pedidos pe
                    inner join lineas_pedidos l on l.pedido_id=pe.id
                    inner join productos pr on l.producto_id=pr.id
                    WHERE pe.usuario_id=? AND pe.id=? 
                    ORDER BY pe.id DESC 
                `, [usuario_id, pedido_id]);
            //console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
    }

    async getPedidosByUser(usuario_id) {
        try {
            /*
            const result = await pool.query(`
                SELECT pe.*,l.unidades,pr.id as producto_id,pr.nombre,pr.descripcion,pr.precio,pr.stock,pr.oferta,pr.fecha as producto_fecha,pr.imagen FROM pedidos pe
                    inner join lineas_pedidos l on l.pedido_id=pe.id
                    inner join productos pr on l.producto_id=pr.id
                    WHERE pe.usuario_id=?  
                    ORDER BY pe.id DESC 
                `,[usuario_id]);
                */
            const result = await pool.query(`
                SELECT * FROM pedidos pe 
                    WHERE pe.usuario_id=?  
                    ORDER BY pe.id DESC 
                `, [usuario_id]);
            //console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
    }

    async insertPedido() {
        try {
            const result = await pool.query('INSERT INTO pedidos (usuario_id,provincia,localidad,direccion,coste,estado,fecha,hora) VALUES (?,?,?,?,?,?,?,?)', [this.usuario_id, this.provincia, this.localidad, this.direccion, this.coste, this.estado, this.fecha, this.hora]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async confirmPedido(id) {
        try {
            const result = await pool.query('UPDATE pedidos SET estado=? WHERE id=?', ['confirmado', id]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async changeEstado(estado, pedido_id) {
        try {
            const result = await pool.query('UPDATE pedidos SET estado=? WHERE id=?', [estado, pedido_id]);
            return result;
        } catch (error) {
            return false;
        }
    }
}