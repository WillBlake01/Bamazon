var mysql = require('mysql');
var inquirer = require('inquirer');
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
  displayItems();

  function displayItems() {
    // Start display items available for sale
    con.query(
      'SELECT item_id, product_name, price, stock_quantity FROM products',
      function (err, res) {
      if (err) throw err;

      console.log('*********Items for Sale************');

      var header = ['ID', 'Product Name', 'Price', 'Quantity'];
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
              return val > 0 && val <= res.length;
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
              console.log('Your order has been fulfilled!'.info);
            });

            displayTotal(answers);
          }
        });
    });
  }

  // End display items available for sale
});

function displayTotal(answers) {
  con.query('SELECT price FROM products', function (err, res) {
    if (err) throw err;
    var totalPrice = answers.quantity * res[answers.id - 1].price;
    console.log('Your total is '.info + '$' + totalPrice);
    console.log('Thank you for your purchase!'.magenta);
    con.query('UPDATE products SET product_sales = product_sales + ? WHERE item_id = 2;',
      [answers.quantity * res[answers.id - 1].price],
      function (err) {
        if (err) throw err;
      });
  });
}
