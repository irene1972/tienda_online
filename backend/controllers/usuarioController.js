import email from '../helpers/email.js';
import pool from '../config/db.js';
import {Usuario} from '../models/Usuario.js';
import {encriptarPassword} from '../helpers/password.js';

const insertUser=async(req,res)=>{
    const {nombre,apellidos,email,password}=req.body;

    try {
        const newPassword=await encriptarPassword(password);
        const usuario=new Usuario(nombre,apellidos,email,newPassword);
        const response=await usuario.save();
        if(response) res.json({mensaje:'Usuario insertado en la base de datos'});
        else return res.status(500).json({error:'Ha habido un error al insertar los datos en la bd'});
    } catch (error) {
        return res.status(500).json({error:'Ha habido un error al insertar los datos'});
    }
    
}

const getUsers=async(req,res)=>{
    try {
        const resultado=await pool.query('SELECT * FROM usuarios');
        res.json(resultado[0][0]);
    } catch (error) {
        return res.status(500).json({error:'Ha habido un error al consultar la base de datos'});
    }
    
}

const envioEmail=async (req, res) => {
    //res.json('Funciona!');

    try {
        //envio del email
        email({
            email:'ireneog_72@hotmail.es',
            nombre: 'Irene Olmos'
        });

        res.json({mensaje:`El email se ha enviado correctamente`});

    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Ha habido un error'});
    }
}

export {
    envioEmail,
    getUsers,
    insertUser
}