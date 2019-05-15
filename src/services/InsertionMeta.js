const request = require('sync-request');
const cheerio = require('cheerio');
const sql = require('mssql');

module.exports.fonctionInsertionMeta = async function fonctionInsertionMeta(uid, url) {

    async function insertMeta()
    {
        const response = request('GET', url);
        const $ = cheerio.load(response.getBody());

            var meta = $('meta')
            var keys = Object.keys(meta)
            var ogType;

            keys.forEach(function(key){
                if (  meta[key].attribs ) {

                    ogType = meta[key].attribs;

                    for (var i = 0, len = Object.keys(ogType).length; i < len; i++)
                    {
                        //console.log(Object.keys(ogType)[i]);
                        //console.log(Object.values(ogType)[i]);
                        //tabMeta[Object.keys(ogType)[i]] = Object.values(ogType)[i];

                        var request = new sql.Request();
                        var requette = "insert into tbMetadatas (UidUrl, Name, Value) values ('" + uid.toString() + "','" + Object.keys(ogType)[i].toString() + "','" + Object.values(ogType)[i].toString() + "')";
                        request.query(requette, function (err, recordset) {
                            if (err){ console.log(err);}
                            else{console.log('meta ok');}
                        });
                    }
                }
            });
    }

/*async function insertMeta()
{
    for (var i = 0, len = meta.length; i < len; i++) {
        if (i < 1)
        {
            console.log(Object.values(meta[0]));
        }
        //var keys = Object.keys(meta[i]);
        //var value = Object.values(meta[i]);


        //console.log(value);
 /!*              var request2 = new sql.Request();
               var requette = "insert into tbMetadatas (UidUrl, Name) values ('"+ uid +"','"+ keys.toString() +"')";
               request2.query(requette, function (err, recordset) {
                   if (err)
                   {
                       console.log(err);
                   }else{
                       console.log(recordset);
                   }
               });*!/

    }
}*/

async function final()
{
    await insertMeta();
}

final();
}

