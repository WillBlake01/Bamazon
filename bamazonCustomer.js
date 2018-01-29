var mysql = require('mysql');
var inquirer = require('inquirer');
var consoleTable = require('console-table');
var colors = require('colors');

// Start set colors theme
colors.setTheme({
  info: 'green',
  warn: 'yellow',
  error: 'red'
});

// end set colors theme

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: 'bamazon'
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!'.info);

  // Start display items available for sale
  con.query('SELECT item_id, product_name, price FROM products', function (err, res) {
    if (err) throw err;

    console.log('***Items for Sale***');

    for (var i = 0; i < res.length; i++) {

      consoleTable([
    ['ID ', 'Product Name ', 'Price '],
    [res[i].item_id, res[i].product_name, res[i].price],
  ]);
    }

    console.log('------------------------');
    connection.end();
  });

  // End display items available for sale

});
