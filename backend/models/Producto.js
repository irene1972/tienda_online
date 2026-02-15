import pool from '../config/db.js';

export class Producto{
    constructor(categoria,nombre,descripcion,precio,stock=0,oferta=null,imagen=null){
        this.id=0;
        this.categoria_id=categoria;
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
    async insertProducto(){
        try {
            const result=await pool.query('INSERT INTO productos (nombre,descripcion,precio,stock,oferta,fecha,imagen,categoria_id) VALUES (?,?,?,?,?,?,?,?)',[this.nombre,this.descripcion,this.precio,this.stock,this.oferta,this.fecha,this.imagen,this.categoria_id]);
            return result;
        } catch (error) {
            return false;
        }
    }
}