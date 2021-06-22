const sql = require('mssql')

const config = {
    user: 'AngelNail_SQLLogin_1',
    password: 'ncrp9cdqka',
    server: 'DBMeyah.mssql.somee.com',
    database: 'DBMeyah',
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


