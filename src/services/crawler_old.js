'use strict';
//const request2 = require('sync-request');
//const module = require('module');
var fonctionListeUrl = require('./InsertionUrl');
var uid;
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


/*sql.connect(sqlConfig, function (err) {
    if (err) console.log(err);
});



    var request = new sql.Request();

    var requette = "select * from tbHostName";
    request.query(requette, function (err, recordset) {
        if (err)
        {
            console.log(err);
        }else{
            console.log(recordset);
        }
    });*/
var UidHost = [];
async function getHostName() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig)
        const result = await sql.query`select * from tbHostName`
        //console.log(result.recordsets[0][1]['HostName']);
        var keys = Object.keys(result.recordsets[0][0])
        var value = Object.values(result.recordsets[0][0])
        //fonctionListeUrl(keys, value);
        //keys.values();
        console.log(keys[0], value[0]);
        console.log(keys[1], value[1]);
        fonctionListeUrl.fonctionListeUrl(value[0], value[1]);
        for (var i = 0, len = result.recordsets[0].length; i < len; i++)
        {
            //var row = result[i].value;
            //console.log(row);
            ////UidHost.push(value);
            //console.log(result.recordsets[0][i])
        }
        //result.forEach(function(key) {
          //  console.log(key);
            //UidHost.push(value);
       // });
    } catch (err) {
        // ... error checks
    }
}


/*async function requettes(){
    var request = new sql.Request();
    return request;
}

async function selection(){
    await connect();
    const request = new sql.Request();
    const requette = "select * from tbHostName";
    request.query(requette, function (err, recordset) {
        if (err)
        {
            console.log(err);
        }else{
            console.log(recordset);
        }
    });
}*/
//selection()
  //  .then(console.log)




/*async function test3(){

        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('mssql://SQLUser2018/2019:SQLPassword2018/2019@DESKTOP-8KKDFL5/dbSearchEngine')
        const result = await sql.query`select * from tbHostName`
        console.dir(result)
}
test3()
    .catch(console.error);*/





const url = require('url');
const supercrawler = require("supercrawler");
const crawler = new supercrawler.Crawler({

  interval: 1000,
  concurrentRequestsLimit: 5,
  robotsCacheTime: 3600000,
  userAgent: "Mozilla/5.0 (compatible; supercrawler/1.0; +https://github.com/brendonboshell/supercrawler)",
  request: {
    headers: {
      'x-custom-header': 'example'
    }
  }
});
crawler.addHandler(supercrawler.handlers.robotsParser());

crawler.addHandler(supercrawler.handlers.sitemapsParser());

crawler.addHandler("text/html", supercrawler.handlers.htmlLinkParser({
  // Restrict discovered links to the following hostnames.
  //hostnames: ["openclassrooms.com"]
}));

// Match an array of content-type
//crawler.addHandler(["text/plain", "text/html"], myCustomHandler);

// Custom content handler for HTML pages.
crawler.addHandler("text/html", function  (context) {
  var sizeKb = Buffer.byteLength(context.body) / 1024;
  logger.info("Processed", context.url /*, "Size=", sizeKb, "KB"*/);
  //arr.push(context.url);
    //var request = new sql.Request();
    var request = new sql.Request();
       var requette = "insert into tbUrl (UidHostName, url) values ('"+uid.toString()+"','" + context.url.toString() + "')";
        request.query(requette, function (err, recordset) {
            //'insert into tbHostName (Uid, HostName) values (\'' + test.toString() + '\', \'exempls.fr\')'
            if (err)
            {
                console.log(err);
            }else{
                console.log(recordset);
            }
        });

});


async function obtenirUrl(value){crawler.getUrlList()
    .insertIfNotExists(new supercrawler.Url('www.openclassrooms.com'))
    .then(function () {
      return crawler.start();
    })};

async function test6(){
    await getHostName();
    UidHost.forEach(async function(value){
        uid = request.query("select Uid from tbHostName where HostName like '"+value+"'")
        await obtenirUrl(value);
    });
}

test6()
    .catch(console.error)

/*crawler.getUrlList()
    .insertIfNotExists(new supercrawler.Url("https://openclassrooms.com/fr/terms-conditions"))
    .then(function () {
        return crawler.start();
    });*/
const request2 = require('sync-request');
const cheerio = require('cheerio');
const logger = require('../libs/logger');
/*

const request2 = require('sync-request');
const cheerio = require('cheerio');
const logger = require('../libs/logger');

function getInfos(url) {
  const response = request2('GET', url);
  const $ = cheerio.load(response.getBody());

    var meta = $('meta')
    var keys = Object.keys(meta)

    var ogType;
    var ogTitle;

    keys.forEach(function(key){
        if (  meta[key].attribs
            //&& meta[key].attribs.name
            ) {
            //console.log(meta[key].attribs);
        }
    });

  // TODO extraire les meta data et les stocker dans la base de donnee
}
getInfos(url.parse('https://allocine.fr'));
//console.log(test.$);*/
