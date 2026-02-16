import pool from '../config/db.js';

export class Pedido{
    constructor(usuario_id,provincia,localidad,direccion,coste,estado='nuevo'){
        this.id=0;
        this.usuario_id=usuario_id;
        this.provincia=provincia;
        this.localidad=localidad;
        this.direccion=direccion;
        this.coste=coste;
        this.estado=estado;
        this.fecha=new Date();
        this.hora=this.fecha.toTimeString().split(' ')[0];
    }

    async getLastPedidoByUser(usuario_id,pedido_id){
        try {
            const result = await pool.query(`
                SELECT pe.*,l.unidades,pr.id as producto_id,pr.nombre,pr.descripcion,pr.precio,pr.stock,pr.oferta,pr.fecha as producto_fecha,pr.imagen FROM pedidos pe
                    inner join lineas_pedidos l on l.pedido_id=pe.id
                    inner join productos pr on l.producto_id=pr.id
                    WHERE pe.usuario_id=? AND pe.id=? 
                    ORDER BY pe.id DESC 
                `,[usuario_id,pedido_id]);
            //console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
    }

    async getPedidosByUser(usuario_id){
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
                `,[usuario_id]);
            //console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
    }

    async insertPedido(){
        try {
            const result=await pool.query('INSERT INTO pedidos (usuario_id,provincia,localidad,direccion,coste,estado,fecha,hora) VALUES (?,?,?,?,?,?,?,?)',[this.usuario_id,this.provincia,this.localidad,this.direccion,this.coste,this.estado,this.fecha,this.hora]);
            return result;
        } catch (error) {
            return false;
        }
    }
}