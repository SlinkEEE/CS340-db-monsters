module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getTypes(res, mysql, context, complete){
        mysql.pool.query("SELECT T.id, T.name AS type FROM types T", function(error, results, fields){    
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.types  = results;
            complete();
        });
    }

    /*Display all available types of monsters.*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');

        getTypes(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('types', context);
            }
        }
    });

    /* Adds a new type of monster and redirects to the Types page after adding */
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO types (name) VALUES (?)";
        var inserts = [req.body.type];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/types');
            }
        });
    });

    return router;
}();






