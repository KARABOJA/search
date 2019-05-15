'use strict';

var fonctionInsertionMeta = require('./InsertionMeta');

const uuidv4 = require('uuid/v4');
//const cheerio = require('cheerio');
const sql = require('mssql');
const logger = require('../libs/logger');
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


module.exports.fonctionListeUrl = async function returnList(tabUid, tabHostName) {

        crawler.addHandler(supercrawler.handlers.robotsParser());
        crawler.addHandler(supercrawler.handlers.sitemapsParser());
        crawler.addHandler("text/html", supercrawler.handlers.htmlLinkParser({
            // Restrict discovered links to the following hostnames.
            //hostnames: [hostName]
        }));

    
        crawler.addHandler("text/html", function (context) {
            var sizeKb = Buffer.byteLength(context.body) / 1024;
            logger.info("Processed", context.url/*, "Size=", sizeKb, "KB"*/);
            var newId = uuidv4();
            var request = new sql.Request();
            var requette = "insert into tbUrl (Uid, Url) values ('" + newId.toString() + "','" + context.url.toString() +"')";
            request.query(requette, function (err, recordset) {
                if (err) { console.log(err); }
                else { console.log('url ok'); }
            });

            fonctionInsertionMeta.fonctionInsertionMeta(newId, context.url);
        });

        for (var i = 0, len = tabUid.length; i < len; i++) {
        crawler.getUrlList()
            .insertIfNotExists(new supercrawler.Url(tabHostName[i]))
            .then(function () {
                return crawler.start();
            });
        }
}

