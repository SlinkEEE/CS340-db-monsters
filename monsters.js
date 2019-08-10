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
        mysql.pool.query("SELECT M.id as id, M.name, M.color, T.name AS type, H.name AS habitat, M.scariness FROM monsters M LEFT JOIN types T ON M.type = T.id LEFT JOIN habitats H ON M.habitat = H.id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.monsters = results;
            complete();
        });
    }

    function fixEmptyValues(req){

        if (req.body.color === "") {

            req.body.color = "unknown";
        }

        if (req.body.type == 0) {

            req.body.type = null;
        }

        if (req.body.habitat == 0) {

            req.body.habitat = null;
        }
    }

    function getMonstersbyType(req, res, mysql, context, complete){
        var query = "SELECT M.id, M.name, M.color, T.name AS type, H.name AS habitat, M.scariness FROM monsters M LEFT JOIN types T ON M.type = T.id LEFT JOIN habitats H ON M.habitat = H.id WHERE M.type = ?";
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

    function getMonster(res, mysql, context, id, complete){
        var sql = "SELECT M.id, M.name, M.color, M.type, M.habitat, M.scariness FROM monsters M WHERE M.id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.monster = results[0];
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
        getHabitats(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('monsters', context);
            }
        }
    });

    /* Display one monster for the specific purpose of updating monsters */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatemonster.js"];
        var mysql = req.app.get('mysql');
        
        getMonster(res, mysql, context, req.params.id, complete);
        getTypes(res, mysql, context, complete);
        getHabitats(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('update-monster', context);
            }
        }
    });

    /* Adds a monster and redirects to the Monsters page after adding */
    router.post('/add', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO monsters (name, color, type, habitat, scariness) VALUES (?,?,?,?,?)";

        fixEmptyValues(req);

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

    /* Basic rounter for post requests, redirects to the Monsters page after adding */
    // we need this because the update form has a post action
    router.post('/', function(req, res){
        console.log(req.body)
        console.log("I'm being redirected.");
        res.redirect('/monsters');   
    });

    /* The URI that update data is sent to in order to update a monster */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log("I have entered the update PUT function.");
        console.log(req.params.id);
        console.log(req.body);
        var sql = "UPDATE monsters M SET M.name=?, M.color=?, M.type=?, M.habitat=?, M.scariness=? WHERE M.id =?";

        fixEmptyValues(req);

        var inserts = [req.body.name, req.body.color, req.body.type, req.body.habitat, req.body.scariness, req.params.id];
        console.log(req.body);

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }else{
                console.log(results);
                console.log(fields);
                res.status(200);
                res.end();
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