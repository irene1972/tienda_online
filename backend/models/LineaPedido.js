import pool from '../config/db.js';

export class LineaPedido{

    constructor(pedido_id,producto_id,unidades){
        this.id=0;
        this.pedido_id=pedido_id;
        this.producto_id=producto_id;
        this.unidades=unidades;
    }

    async insertLineaPedido(){
        try {
            const result=await pool.query('INSERT INTO lineas_pedidos (pedido_id,producto_id,unidades) VALUES (?,?,?)',[this.pedido_id,this.producto_id,this.unidades]);
            return result;
        } catch (error) {
            return false;
        }
    }
}