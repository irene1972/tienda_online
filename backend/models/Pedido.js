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

    async insertPedido(){
        try {
            const result=await pool.query('INSERT INTO pedidos (usuario_id,provincia,localidad,direccion,coste,estado,fecha,hora) VALUES (?,?,?,?,?,?,?,?)',[this.usuario_id,this.provincia,this.localidad,this.direccion,this.coste,this.estado,this.fecha,this.hora]);
            return result;
        } catch (error) {
            return false;
        }
    }
}