var mysql = require('mysql');
var inquirer = require('inquirer');
var consoleTable = require('console-table');
var WordTable = require('word-table');
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
  displayItems();

  function displayItems() {
    // Start display items available for sale
    con.query('SELECT item_id, product_name, price FROM products', function (err, res) {
      if (err) throw err;

      console.log('*********Items for Sale************');

      var header = ['ID', 'Product Name', 'Price'];
      var table = [];
      for (var i = 0; i < res.length; i++) {
        table.push(Object.values(res[i]));
      }

      // basic usage
      var wt = new WordTable(header, table);
      console.log(wt.string());

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'id',
            message: 'Which item ID would you like to purchase?',
            validate: function (val) {
              return val > 0 && val <= table.length;
            },
          },
          {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to buy?',
            validate: function (val) {
              return val !== '' && val > 0;
            },
          },
      ])

      .then(function (answers) {
          if (res[answers.id - 1].stock_quantity < answers.quantity) {
            console.log('Insufficient stock! Your order has been cancelled'.error);
          } else {
            con.query
              ('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?',
            [answers.quantity, answers.id],
            function (err) {
              if (err) throw err;
              console.log('Item in stock, available to promise!'.info);
            });
          }
        });
    });
  }

  // End display items available for sale
});
