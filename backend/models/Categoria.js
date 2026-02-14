import pool from '../config/db.js'

export class Categoria{
    constructor(nombre){
        this.id=0;
        this.nombre=nombre;
    }

    async getCategorias(){
        try {
            const result = await pool.query('SELECT * FROM categorias');
            console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
    }
}