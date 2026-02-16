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

     async getProductosPorCategoria(id){
        try {
            const result = await pool.query('SELECT * FROM productos WHERE categoria_id=? ORDER BY id DESC',[id]);
            //console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
    }

    async getProductoById(id){
        try {
            const result = await pool.query('SELECT * FROM productos WHERE id=?',[id]);
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
    async updateProduct(id){
        try {
            const result=await pool.query('UPDATE productos SET categoria_id = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, oferta = ? WHERE id=?;',[this.categoria_id, this.nombre, this.descripcion, this.precio, this.stock, this.oferta,id]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async updateProductWithImage(id){
        try {
            const result=await pool.query('UPDATE productos SET categoria_id = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, oferta = ?, imagen = ? WHERE id=?;',[this.categoria_id, this.nombre, this.descripcion, this.precio, this.stock, this.oferta, this.imagen, id]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async deleteProduct(id){
        try {
            const result=await pool.query('DELETE FROM productos WHERE id=?',[id]);
            return result;
        } catch (error) {
            return false;
        }
    }
}