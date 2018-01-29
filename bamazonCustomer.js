var mysql = require ('mysql');
var inquirer = require ('inquirer');

var con = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889'
});

con.connect (function (err) {
  if (err) throw err;
  console.log('Connected!');
})
