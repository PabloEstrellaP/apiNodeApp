const { response } = require('express');
const { verify } = require('jsonwebtoken');
const { runQuery } = require('../database/sqlConnection');
const { generarJWT, comprobarJWT } = require('../helpers/jwt');
const getUsuarios = async ( req, res = response ) => {

    try {
        const { recordset } = await runQuery('select * from usuario');

        res.status(200).json({
            ok : true,
            msg : recordset 
        });

    } catch (error) {
        res.status(400).json({
            ok : false,
            msg : 'Error fatal, data no encontrada'
        });
    }

}

const getUsuario = async ( req, res = response) => {

    const usuarioId = req.params.id;

    const data = await runQuery(`select * from usuario where usuarioId = ${usuarioId}`);
    
    if(data.rowsAffected[0] === 0 ){
        return res.status(400).json({
            ok  : false, 
            msg : 'Usuario no encontrado' 
        });
    }

    res.status(200).json({
        ok : true,
        msg : data.recordset
    });
}

const loginUsuario = async ( req, res = response) => {
    
    const {	email, password } = req.body;

    try {
        const { rowsAffected, recordset } = await runQuery(`Select * from usuario where Email = '${email}' and Contraseña = '${password}'`);
        if(rowsAffected[0] > 0){
            const { UsuarioId } = recordset[0];
            const token = await generarJWT( UsuarioId );
            return res.status(200).json({
                ok  : true,
                msg : {
                    data : recordset[0],
                    token
                }
            });
        }
        return res.status(400).json({
            ok : false, 
            msg : 'Usuario no encontrado'
        })
    } catch (error) {
        res.status(400).json({
            ok : 'false',
            msg : 'Contactarse con el administrador'
        });
    }

}

const renewToken = async(req, res = response) => {

    const id = req.id;
    
    const token = await generarJWT( id );

    const { recordset } = await runQuery(`select * from usuario where usuarioId = ${id}`);
    

    res.json({
        ok: true,
        msg : {
            data : recordset[0],
            token
        } 
    });
}


const addUsuario = async ( req, res = response ) => {

    const {	email, password, confirmPassword, tipoId} = req.body;
    if(password !== confirmPassword){
        return res.status(400).json({
            ok : false,
            msg : 'Las contraseñas no son iguales'
        });
    }

    const {rowsAffected} = await runQuery(`select * from usuario where Email = '${email.trim()}';`)
    
    if( rowsAffected[0] > 0 ){
        return res.status(400).json({
            ok : false,
            msg : `El correo: '${email}' ya se encuentra en uso`
        });
    }

    const data = await runQuery(`insert into usuario(Email, Contraseña, TipoId) output inserted.usuarioId values ('${email.trim()}', '${password.trim()}', ${tipoId})`);
    
    if(data.rowsAffected[0] > 0){
        return res.status(200).json({
            ok : true,
            msg : '¡Datos agregados exitosamente!',
            data : {
                usuarioId : data.recordset[0].usuarioId,
                email,
            } 
        });
    }  
}

const deleteUsuario = async ( req, res = response ) => {
    const usuarioId = req.params.id;

    try {
        const { rowsAffected } = await runQuery(`delete from usuario where usuarioid = ${usuarioId} `)

        if(rowsAffected[0] > 0){
            return res.status(200).json({
                ok : true,
                msg : 'El usuario ha sido eliminado'
            });
        }

        res.status(400).json({
            ok : false,
            msg : 'Error fatal, usuario no encontrado'
        })
    } catch (error) {
        res.status(400).json({
            ok : false,
            msg : 'Contactar con el administrador'
        });
    }

}

const updateUsuario = async ( req, res = response) => {
    
    const {	email, password, confirmPassword, tipoId} = req.body;
    const usuarioId = req.params.id;
    
    if(password !== confirmPassword){
        return res.status(400).json({
            ok : false,
            msg : 'Las contraseñas no son iguales'
        });
    }

    const {rowsAffected} = await runQuery(`select * from usuario where Email = '${email.trim()}';`)
    
    if( rowsAffected[0] > 0 ){
        return res.status(400).json({
            ok : false,
            msg : `El correo: '${email}' ya se encuentra en uso`
        });
    }

    const data = await runQuery(`update usuario set Email = '${email.trim()}', Contraseña = '${password.trim()}', TipoId = ${tipoId} where usuarioID = ${usuarioId}`);
    
    if(data.rowsAffected[0] > 0){
        return res.status(200).json({
            ok : true,
            msg : '¡Datos actualizados exitosamente!',
            data : {
                usuarioId ,
                email,
            } 
        });
    }  
}

module.exports = {

    getUsuarios,
    getUsuario,
    loginUsuario,
    addUsuario,
    deleteUsuario,
    updateUsuario,
    renewToken

}