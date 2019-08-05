module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getHabitats(res, mysql, context, complete){
        mysql.pool.query("SELECT H.id, H.name AS habitat, H.climate FROM habitats H", function(error, results, fields){    
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.habitats  = results;
            complete();
        });
    }

    /*Display all available habitats where monsters live */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');

        getHabitats(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('habitats', context);
            }
        }
    });

    /* Adds a new habitat and redirects to the Habitats page after adding */
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO habitats (name, climate) VALUES (?,?)";
        var inserts = [req.body.name, req.body.climate];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/habitats');
            }
        });
    });

    return router;
}();






