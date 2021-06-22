const jwt = require('jsonwebtoken');


const generarJWT = (id) => {
    return new Promise(( resolve, reject ) => { 
        const uid = { id };
        jwt.sign( uid, process.env.JWT_KEY, {
            expiresIn : "24d"
        }, ( err, token ) => {
            if(err){
                reject('No se pudo generar el JWT');
            }else{
                resolve(token);
            }
        });
    });
} 

const comprobarJWT = ( token = '' ) => {
    try {
        const { id } = jwt.verify( token, process.env.JWT_KEY);
        return [true, id];

    } catch (error) {
        return [false, null];
    }
}


module.exports = {
    generarJWT, 
    comprobarJWT
}