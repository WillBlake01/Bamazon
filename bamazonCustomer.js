var mysql = require('mysql');
var inquirer = require('inquirer');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: 'bamazon'
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');

  // Display items available for sale
  con.query('SELECT item_id, product_name, price FROM products', function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
  // End display items available for sale

});
