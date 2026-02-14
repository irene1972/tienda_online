import pool from '../config/db.js';

export class Usuario {
    constructor(nombre, apellidos, email, password, rol='user', imagen=null) {
        this.id = 0;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.imagen = imagen;
    }
    async save() {
        try {
            const result = await pool.query('INSERT INTO usuarios (nombre,apellidos,email,password,rol,imagen) VALUES (?,?,?,?,?,?)', [this.nombre, this.apellidos, this.email, this.password, this.rol, this.imagen]);
            return result;
        } catch (error) {
            return false;
        }

    }

    async getUserByEmail(email){
        try {
            const result = await pool.query('SELECT * FROM usuarios WHERE email=?',[email]);
            console.log('result',result);
            return result;
        } catch (error) {
            return false;
        }
        
    }
}