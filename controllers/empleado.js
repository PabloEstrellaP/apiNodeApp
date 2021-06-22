const { response } = require("express");
const {runQuery} = require('../database/sqlConnection');

const getEmpleados = async ( req, res = response ) => {
    try {
        
        const {recordset} = await runQuery('select * from empleado');

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

const getEmpleado = async ( req, res = response ) => {
    
    const empleadoId = req.params.id;

    const {recordsets} = await runQuery(`select * from empleado where empleadoID = ${empleadoId}`);

    if(recordsets[0].length === 0){
        return res.status(400).json({
            ok  : false,
            msg : `Error falta, usuario no encontrado`
        });
    }

    res.status(200).json({
        ok  : true,
        msg : recordsets[0]
    });
}

const addEmpleado = async ( req, res = response ) => {
    
    const {nombreemp, apellidoem, telefono, fechanacimiento, usuarioId} = req.body;

    const dataEmpleado = await runQuery(`insert into Empleado(Nombreemp, Apellidoem, UsuarioId, Telefono, Fechanacimiento, Creado) output inserted.EmpleadoId values ('${nombreemp}', '${apellidoem}',${usuarioId}, '${telefono}', '${fechanacimiento}', GETDATE())`);
    const {EmpleadoId} = dataEmpleado.recordset[0];
    const {rowsAffected} = dataEmpleado;
    
    if(rowsAffected[0] < 1){
        res.status(200).json({
            ok  : false,
            msg : '¡Los datos no han sido agregados!' 
        });
    }
    
    res.status(200).json({
        ok  : true,
        msg : '¡Los Datos del usuario han sido agreado exitosamente!',
        data : {
            Nombre: nombreemp,
            Apellido : apellidoem,
            Telefono: telefono,
            FechaNacimiento : fechanacimiento,
            EmpleadoId
        }
    }); 
}

const deleteEmpleado = async ( req, res = response) => {

    try {
        const empleadoId = req.params.id;

        const {rowsAffected} = await runQuery(`delete from empleado where empleadoId = ${empleadoId} `);
        if(rowsAffected[0] > 0){
            
            res.status(200).json({
                ok  : true,
                msg : 'Datos borrados correctamente'
            });
            
        }
        else{
            return res.status(400).json({
                ok  : false,
                msg : 'Error fatal, usuario no encontrado'
            });
        }
    } catch (error) {
        res.status(400).json({
            ok : false, 
            msg : 'Contactar con el administrador'
        })
    }
}

const updateEmpleado = async ( req, res = response ) => {
    
    try {
        const empleadoId = req.params.id;
        const {nombreemp, apellidoem, telefono, fechanacimiento} = req.body;

        const {rowsAffected} = await runQuery(`update Empleado set Nombreemp = '${nombreemp}', Apellidoem = '${apellidoem}', Telefono = '${telefono}', Fechanacimiento = '${fechanacimiento}', Modificado = GETDATE() where EmpleadoId = ${empleadoId}`);
        if(rowsAffected[0] < 0){
            return res.status(400).json({
                ok : false,
                msg : 'Error fatal, datos no actualizados'
            });
        }
        
        const {recordset} = await runQuery(`select * from empleado where empleadoID = ${empleadoId}`);

        return res.status(200).json({
            ok : true,
            msg: '¡Datos actualizados exitosamente!',
            data : recordset[0]
        });
    } catch (error) {
        res.status(400).json({
            ok : false,
            msg : 'Contactar con el administrador'
        });
    }
}

module.exports = {
    getEmpleados,
    getEmpleado,
    addEmpleado,
    deleteEmpleado,
    updateEmpleado
}