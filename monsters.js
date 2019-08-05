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

    function getHabitats(res, mysql, context, complete){
        mysql.pool.query("SELECT H.id, H.name AS habitat FROM habitats H", function(error, results, fields){    
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.habitats  = results;
            complete();
        });
    }
  
    function getMonsters(res, mysql, context, complete){
        mysql.pool.query("SELECT M.id as id, M.name, M.color, T.name AS type, H.name AS habitat, M.scariness FROM monsters M INNER JOIN types T ON M.type = T.id INNER JOIN habitats H ON M.habitat = H.id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.monsters = results;
            complete();
        });
    }

    function getMonstersbyType(req, res, mysql, context, complete){
        var query = "SELECT M.id, M.name, M.color, T.name AS type, H.name AS habitat, M.scariness FROM monsters M INNER JOIN types T ON M.type = T.id INNER JOIN habitats H ON M.habitat = H.id WHERE M.type = ?";
        console.log(req.params)
        var inserts = [req.params.type]
        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.monsters = results;
            complete();
        });
    }



    /*Display all monsters. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletemonster.js", "filtermonsters.js"];
        var mysql = req.app.get('mysql');

        getMonsters(res, mysql, context, complete);
        getTypes(res, mysql, context, complete);
        getHabitats(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('monsters', context);
            }
        }
    });


    /*Display all monsters of a given type. Requires web based javascript to delete monsters with AJAX*/
    router.get('/filter/:type', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletemonster.js","filtermonsters.js"];
        var mysql = req.app.get('mysql');
        getMonstersbyType(req,res, mysql, context, complete);
        getTypes(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('monsters', context);
            }
        }
    });


    /* Adds a monster and redirects to the Monsters page after adding */
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO monsters (name, color, type, habitat, scariness) VALUES (?,?,?,?,?)";
        var inserts = [req.body.name, req.body.color, req.body.type, req.body.habitat, req.body.scariness];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/monsters');
            }
        });
    });


    /* Route to delete a monster, returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM monsters WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })


return router;
}();