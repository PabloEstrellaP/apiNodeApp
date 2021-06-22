const { request, response } = require('express');
const { runQuery } = require('../database/sqlConnection');


const getPeople = async ( req, res = response ) => {
    
    try {
        
        const {recordset} = await runQuery('select * from Persona');

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

const getPerson = async ( req, res = response ) => {
    
    const idPersona = req.params.id;
    try {
        const { recordset } = await runQuery(`select * from Persona where Idpersona = ${idPersona}`);
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

const addPerson = async ( req, res = response ) => {
    const { Curp, Nombres, Apellido_paterno, Apellido_materno , Fecha_nac, Direccion, Colonia, Cp, Telefono, Correoelectronico  } = req.body;
    try {
        const { recordset, rowsAffected} = await runQuery(`insert into Persona(Curp, Nombres, Apellido_paterno, Apellido_materno , Fecha_nac, Direccion, Colonia, Cp, Telefono, Correoelectronico) output inserted.Idpersona values ('${Curp}', '${Nombres}', '${Apellido_paterno}', '${Apellido_materno}','${Fecha_nac}', '${Direccion}', '${Colonia}', '${Cp}', '${Telefono}', '${Correoelectronico}')`);
        const { Idpersona } = recordset[0];
        if( rowsAffected[0] > 0 ) {
            return res.status(200).json({
                ok : true,
                msg : { 
                    Curp, 
                    Nombres, 
                    Apellido_paterno, 
                    Apellido_materno , 
                    Fecha_nac, Direccion, 
                    Colonia, 
                    Cp, 
                    Telefono, 
                    Correoelectronico,
                    Idpersona
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

const deletePerson = async ( req, res = response ) => {
    const idPerson = req.params.id;
    try {
        const data = await runQuery(`delete from Persona where Idpersona = ${idPerson}`);
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

const editPerson = async ( req, res = response ) => {
    
    const idPerson = req.params.id;
    const { Curp, Nombres, Apellido_paterno, Apellido_materno , Fecha_nac, Direccion, Colonia, Cp, Telefono, Correoelectronico } = req.body;

    try {
        
        const { rowsAffected } = await runQuery(`update Persona set Curp = '${Curp}', Nombres = '${Nombres}', Apellido_paterno = '${Apellido_paterno}', Apellido_materno = '${Apellido_materno}', Fecha_nac = '${Fecha_nac}', Direccion = '${Direccion}', Colonia = '${Colonia}', Cp = '${Cp}', Telefono = '${Telefono}', Correoelectronico = '${Correoelectronico}'  where Idpersona = ${idPerson}`);
        
        if(rowsAffected[0] > 0){
            const { recordset } = await runQuery(`select * from Persona where Idpersona = ${idPerson}`);
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
            msg : 'Contactar con el administrador',
        });
    }
}

module.exports = {
    getPeople,
    getPerson, 
    addPerson,
    deletePerson,
    editPerson
}