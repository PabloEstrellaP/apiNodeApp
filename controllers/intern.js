const { request, response } = require('express');
const { runQuery } = require('../database/sqlConnection');


const getInterns = async ( req, res = response ) => {
    
    try {
        
        const {recordset} = await runQuery('select * from becario');

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

const getIntern = async ( req, res = response ) => {
    
    const idBecario = req.params.id;
    try {
        const { recordset } = await runQuery(`select * from becario where Idbecario = ${idBecario}`);
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

const addIntern = async ( req, res = response ) => {
    const { Promedio, Escuela, Licenciatura, Idpersona } = req.body;
    try {

        const { recordset, rowsAffected} = await runQuery(`insert into becario(Promedio, Escuela, Licenciatura, Idpersona) output inserted.Idbecario values ('${Promedio}', '${Escuela}', '${Licenciatura}', '${Idpersona}')`);
        const { Idbecario } = recordset[0];
        if( rowsAffected[0] > 0 ) {
            return res.status(200).json({
                ok : true,
                msg : { 
                    Promedio, 
                    Escuela, 
                    Licenciatura,
                    Idbecario
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

const deleteIntern = async ( req, res = response ) => {
    const idBecario = req.params.id;
    try {
        const data = await runQuery(`delete from becario where Idbecario = ${idBecario}`);
        res.status(200).json({
            ok : true,
            msg : 'El becario se ha borrado con éxito',
        });
        
    } catch (error) {
        res.status(400).json({
            ok : false,
            msg : 'Contactar con el administrador'
        });
    }
}

const editIntern = async ( req, res = response ) => {
    
    const idBecario = req.params.id;
    const { Promedio, Escuela, Licenciatura, Idpersona } = req.body;

    try {
        
        const { rowsAffected } = await runQuery(`update becario set Promedio = '${Promedio}', Escuela = '${Escuela}', Licenciatura = '${Licenciatura}', Idpersona = '${Idpersona}' where Idbecario = ${idBecario}`);
        
        if(rowsAffected[0] > 0){
            const { recordset } = await runQuery(`select * from becario where Idbecario = ${idBecario}`);
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
    getInterns,
    getIntern, 
    addIntern,
    deleteIntern,
    editIntern
}