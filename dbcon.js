var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  	host			: 'classmysql.engr.oregonstate.edu',
	user			: 'cs340_babayans',
	password		: '----',
	database		: 'cs340_babayans'
});
module.exports.pool = pool;
