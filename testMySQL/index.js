
var express    = require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1',
    database : 'fms1'
});

var app = express();


connection.connect();

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});


connection.query('SELECT * from users', function(err, rows, fields) {
    if (!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query.');
});

connection.end();
