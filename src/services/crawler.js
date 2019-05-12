'use strict';


//import * as url from "url";
const url = require('url');
const supercrawler = require("supercrawler");
//console.log(url.parse('https://www.google.com'))
const crawler = new supercrawler.Crawler({
  // By default, Supercrawler uses a simple FIFO queue, which doesn't support
  // retries or memory of crawl state. For any non-trivial crawl, you should
  // create a database. Provide your database config to the constructor of
  // DbUrlList.
  /*urlList: new supercrawler.DbUrlList({
    db: {
      database: "crawler",
      username: "SQLUser2018/2019",
      password: "SQLPassword2018/2019",
      sequelizeOpts: {
        dialect: "mssql",
        host: "localhost"
      }
    }
  }),*/
  // Tme (ms) between requests
  interval: 1000,
  // Maximum number of requests at any one time.
  concurrentRequestsLimit: 5,
  // Time (ms) to cache the results of robots.txt queries.
  robotsCacheTime: 3600000,
  // Query string to use during the crawl.
  userAgent: "Mozilla/5.0 (compatible; supercrawler/1.0; +https://github.com/brendonboshell/supercrawler)",
  // Custom options to be passed to request.
  request: {
    headers: {
      'x-custom-header': 'example'
    }
  }
});
// Get "Sitemaps:" directives from robots.txt
crawler.addHandler(supercrawler.handlers.robotsParser());

// Crawl sitemap files and extract their URLs.
crawler.addHandler(supercrawler.handlers.sitemapsParser());

// Pick up <a href> links from HTML documents
crawler.addHandler("text/html", supercrawler.handlers.htmlLinkParser({
  // Restrict discovered links to the following hostnames.
  hostnames: ["openclassrooms.com"]
}));

// Match an array of content-type
//crawler.addHandler(["text/plain", "text/html"], myCustomHandler);

// Custom content handler for HTML pages.
crawler.addHandler("text/html", function (context) {
  var sizeKb = Buffer.byteLength(context.body) / 1024;
  logger.info("Processed", context.url, "Size=", sizeKb, "KB");
});

crawler.getUrlList()
    .insertIfNotExists(new supercrawler.Url("https://openclassrooms.com/fr/terms-conditions"))
    .then(function () {
      return crawler.start();
    });
const request = require('sync-request');
const cheerio = require('cheerio');
const logger = require('../libs/logger');

function getInfos(url) {
  logger.info('Parsing URL [%s]', url);
  const response = request('GET', url);
  const $ = cheerio.load(response.getBody());
  //console.log($('a').attr('href'));
  // TODO extraire les meta data et les stocker dans la base de donnee
}
getInfos(url.parse('https://openclassrooms.com'));
//console.log(test.$);