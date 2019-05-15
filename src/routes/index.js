'use strict';
//const path = require('path');
const express = require('express');
const routerRoot = express.Router();
//var test = require('./test');
const sql = require('mssql');

//await final();
//await listeUrl();
//test.test();


function test2() {
    var request = new sql.Request();
    var requette = "select * from tbMetadatas where Value like 'viewport'";
    request.query(requette, function (err, recordset) {
        if (err) { console.log(err); }
        else { console.log('ok'); }
    });
}

test2();


routerRoot.get('/:Recherche?', function (req, res) {

    //await final();
    //var recherche = req.params.Recherche;
    //res.sendFile(path.join(__dirname + '/index.html'));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write('<!DOCTYPE html >'+
        '<html>'+
           '<head>'+
                '<title>AD Search Engine</title>'+ 
            '</head>'+
        '<body>' +
        '<p align="center"><strong><font size=20>AD SEARCH ENGINE</font></strong></p>' +
            '<form name="form1" action="/">'+
                '<div align="center">'+
                    '<input id="Recherche" type="text" name="Recherche" placeholder="Ta recherche ici..."><input type="submit" value="Rechercher..." OnClick="listeUrl()">'+
        '</div>'+
        '</form>' +
        '<div id="resultats">' +
                    '</div>'+
'</body>'+
'</html>'
    );
});

routerRoot.get('/ping', function(req, res) {
  res.send('PONG');
});



module.exports = routerRoot;
