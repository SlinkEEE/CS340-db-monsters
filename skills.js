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

    function getSkills(res, mysql, context, complete){
        mysql.pool.query("SELECT S.id, S.name AS skill, S.difficulty FROM skills S", function(error, results, fields){    
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.skills  = results;
            complete();
        });
    }

    /* get list of which monsters have which skills */
    function getMonstersWithSkills(res, mysql, context, complete){
        sql = "SELECT M.name AS monster, S.name AS skill FROM monsters M INNER JOIN monsters_skills MS ON M.id = MS.monster_id INNER JOIN skills S ON MS.skill_id = S.id GROUP BY M.name, S.name"
         mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.monsters_with_skills = results
            complete();
        });
    }

    /*Display all available skills that monsters have */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');

        getMonsters(res, mysql, context, complete);
        getSkills(res, mysql, context, complete);
        getMonstersWithSkills(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('skills', context);
            }
        }
    });

    /* Adds a skill and redirects to the Skills page after adding */
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO skills (name, difficulty) VALUES (?,?)";
        var inserts = [req.body.name, req.body.difficulty];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/skills');
            }
        });
    });

    return router;
}();






