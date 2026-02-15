import pool from '../config/db.js';

export class Producto{
    constructor(nombre,descripcion,precio,stock=0,oferta=null,imagen=null){
        this.id=0;
        this.categoria_id=0;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.precio=precio;
        this.stock=stock;
        this.oferta=oferta;
        this.fecha=new Date();
        this.imagen=imagen;
    }

    async getProductos(){
        try {
            const result = await pool.query('SELECT * FROM productos ORDER BY id DESC');
            //console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
    }
}