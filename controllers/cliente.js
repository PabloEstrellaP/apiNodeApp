const { request, response } = require('express');
const { runQuery } = require('../database/sqlConnection');


const getClientes = async ( req, res = response ) => {
    
    try {
        
        const {recordset} = await runQuery('select * from cliente');

        res.status(200).json({
            ok  : true,
            msg : recordset 
        });

    } catch (error) {
        res.status(400).json({
            ok  : false,
            msg : `Error falta ${error}`
        });

    }
}

const getCliente = async ( req, res = response ) => {
    
    const IdCLiente = req.params.id;
    try {
        const { recordset } = await runQuery(`select * from cliente where ClienteId = ${IdCLiente}`);
        if(recordset.length === 0){
            return res.status(400).json({
                ok : false,
                msg : 'Error fatal, usuario no encontrado'
            });
        }

        return res.status(200).json({
            ok : true,
            msg : recordset[0]
        });

    } catch (error) {
        res.status(400).json({
            ok : false,
            msg : 'Contactar con el administrador'
        });
    }

}

const addCliente = async ( req, res = response ) => {
    const { nombrecl, apellidocl, nacimiento, direccion, telefono, usuarioId } = req.body;
    try {
        
        const { recordset, rowsAffected} = await runQuery(`insert into cliente(Nombrecl, Apellidocl, Nacimiento, Direccion, Telefono, Creado, UsuarioId) output inserted.clienteid values ('${nombrecl}', '${apellidocl}', '${nacimiento}', '${direccion}','${telefono}', GETDATE(), ${usuarioId})`);
        const { clienteid } = recordset[0];
        if( rowsAffected[0] > 0 ) {
            return res.status(200).json({
                ok : true,
                msg : { 
                    clienteid,
                    nombrecl, 
                    apellidocl, 
                    nacimiento, 
                    direccion, 
                    telefono, 
                    usuarioId 
                }
            });    
        }
        
        res.status(400).json({
            ok : false,
            msg : 'Dato no insertado.'
        });

    } catch (error) {
        res.status(400).json({
            ok : false, 
            msg : 'Contactar con un administrador',
        });
    }
}

const deleteCliente = async ( req, res = response ) => {
    const idCliente = req.params.id;
    try {
        const data = runQuery(`delete from cliente where ClienteId = ${idCliente}`);
        res.status(200).json({
            ok : true,
            msg : 'El cliente se ha borrado con éxito',
        });
        
    } catch (error) {
        res.status(400).json({
            ok : false,
            msg : 'Contactar con el administrador'
        });
    }
}

const updateCliente = async ( req, res = response ) => {
    
    const idCliente = req.params.id;
    const { nombrecl, apellidocl, nacimiento, direccion, telefono } = req.body;

    try {
        const { rowsAffected } = await runQuery(`update cliente set Nombrecl = '${nombrecl}', Apellidocl = '${apellidocl}', Nacimiento = '${nacimiento}', direccion = '${direccion}', telefono = '${telefono}', modificado = GETDATE() where clienteID = ${idCliente}`);

        if(rowsAffected[0] > 0){
            const { recordset } = await runQuery(`select * from cliente where ClienteId = ${idCliente}`);
            return res.status(200).json({
                ok : true,
                msg : recordset[0]
            });
        }
        
        res.status(400).json({
            ok : false,
            msg : 'Datos no actualizados'
        });

    } catch (error) {
        res.status(400).json({
            ok : false,
            msg : 'Contactar con el administrador'
        });
    }
}

module.exports = {
    getClientes,
    getCliente, 
    addCliente,
    deleteCliente,
    updateCliente
}