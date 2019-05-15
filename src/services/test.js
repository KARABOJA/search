const sql = require('mssql');


var sqlConfig = {
    user: 'SQLUser2018/2019',
    password: 'SQLPassword2018/2019',
    server: 'DESKTOP-8KKDFL5',
    database: 'dbSearchEngine',
    port: 1433,
    dialect: "mssql",
    dialectOptions: "MSSQLSERVER"
};

sql.connect(sqlConfig);

module.exports.test = function test2() {
    
    var request = new sql.Request();
    var requette = "select * from tbMetadatas";
    request.query(requette, function (err, recordset) {
        if (err) { console.log("ko"); }
        else { console.log('ok'); }
    });
}
