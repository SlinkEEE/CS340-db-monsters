module.exports = function(){
    var express = require('express');
    var router = express.Router();

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
    
    function getWeaknesses(res, mysql, context, complete){
        mysql.pool.query("SELECT W.id, W.name AS weakness FROM weaknesses W", function(error, results, fields){    
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.weaknesses  = results;
            complete();
        });
    }

    /* get list of which monsters have which weaknesses */
    function getMonstersWithWeaknesses(res, mysql, context, complete){
        sql = "SELECT M.id AS monster_id, W.id AS weakness_id, M.name AS monster, W.name AS weakness FROM monsters M INNER JOIN monsters_weaknesses MW ON M.id = MW.monster_id INNER JOIN weaknesses W ON MW.weakness_id = W.id GROUP BY M.name, W.name"
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.monsters_with_weaknesses = results
            complete();
        });
    }

    /*Display all available weaknesses that monsters have */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletemonster.js"];
        var mysql = req.app.get('mysql');

        getMonsters(res, mysql, context, complete);
        getWeaknesses(res, mysql, context, complete);
        getMonstersWithWeaknesses(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('weaknesses', context);
            }
        }
    });

    /* Adds a weakness and redirects to the Weaknesses page after adding */
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO weaknesses (name) VALUES (?)";
        var inserts = [req.body.name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/weaknesses');
            }
        });
    });



    /* Delete a monster's weakness record
    /* This route will accept a HTTP DELETE request in the form /monster_id/{{monster_id}}/weakness_id/{{weakness_id}}
    /*  -- which is sent by the AJAX form */
    router.delete('/monster_id/:monster_id/weakness_id/:weakness_id', function(req, res){
        //console.log(req) //I used this to figure out where did pid and cid go in the request
        console.log(req.params.monster_id)
        console.log(req.params.weakness_id)
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM monsters_weaknesses WHERE monster_id = : ? AND weakness_id = ?";
        var inserts = [req.params.monster_id, req.params.weakness_id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400); 
                res.end(); 
            }else{
                //res.status(202).end();
                res.redirect('/weaknesses');
            }
        })
    })

    return router;
}();






