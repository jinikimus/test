/**
 * Created by admin on 30.04.15.
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1',
    database : 'fms1'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});

connection.end();