'use strict';

var fonctionListeUrl = require('./InsertionUrl');
var fonctionInsertionMeta = require('./InsertionMeta');

const sql = require('mssql');

var sqlConfig = {
    user: 'SQLUser2018/2019',
    password: 'SQLPassword2018/2019',
    server: 'DESKTOP-8KKDFL5',
    database: 'dbSearchEngine',
    port: 1433,
    dialect:"mssql",
    dialectOptions:"MSSQLSERVER"
};

var results= null;
var tabHostName = [];
var tabUidHostName = [];
var tabUidUrl = [];


async function connect() {
    await sql.connect(sqlConfig)
}

async function insertUrl() {
    results = await sql.query`select * from tbHostName`;
    for (var i = 0, len = results.recordsets[0].length; i < len; i++)
    {
        var keys = Object.keys(results.recordsets[0][i]);
        var value = Object.values(results.recordsets[0][i]);

        console.log(keys[0], value[0]);
        console.log(keys[1], value[1]);

        tabUidHostName.push(value[0])
        tabHostName.push(value[1]);
    }
}

//async function insertMeta(uid)
//{
//    results = await sql.query`select * from tbUrl`;

//    for (var i = 0, len = results.recordsets[0].length; i < len; i++)
//    {
//        var keys = Object.keys(results.recordsets[0][i]);
//        var value = Object.values(results.recordsets[0][i]);

//        //console.log(keys[0], value[0]);
//        //console.log(keys[1], value[1]);

//        //tabUidUrl.push(value[0])
//        //tabUrl.push(value[1]);
//        tabUidUrl[value[0]] = value[1];
//        await fonctionInsertionMeta.fonctionInsertionMeta(value[0], value[1]);
//    }
//    //console.log(url);
//}

async function final(){
    await connect();
    await insertUrl();
    await fonctionListeUrl.fonctionListeUrl(tabUidHostName, tabHostName);

        //(insertMeta());
   // await insertUrl();
    //await insertMeta();
}

final();



