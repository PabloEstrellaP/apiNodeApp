const sql = require('mssql')

const config = {
    user: 'pablobubu_SQLLogin_1',
    password: '2kn49esol9',
    server: 'alborada.mssql.somee.com',
    database: 'alborada',
    options: {
        encrypt : true,
        enableArithAbort : true
    },
}

sql.on('error', err => {
    console.log('Base de datos no conectada')
})

const runQuery = (query) => {
    return sql.connect(config).then((pool) => {
      const e = pool.query(query);
      return e;
    })
}

module.exports = {
    runQuery
};


