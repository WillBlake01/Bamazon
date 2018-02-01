// Require npm package dependencies
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

// Creates connection with mySQL database
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: 'bamazon'
});

// Displays items available for sale
function displayItems() {
  con.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products',
    function (err, res) {
    if (err) throw err;

    console.log('****************Items for Sale******************');

    // Table parameters
    var header = ['ID', 'Product Name', 'Price', 'Quantity'];
    var table = [];
    var itemId = [];
    var price = [];
    var quantity = [];
    for (var i = 0; i < res.length; i++) {
      table.push(Object.values(res[i]));
      itemId.push(res[i].item_id);
      itemId.push(res[i].price);
      itemId.push(res[i].quantity);
    }

    // Creates table with word-table npm package based on above parameters
    var wt = new WordTable(header, table);
    console.log(wt.string());
    console.log('Press Ctrl + C to exit');
    console.log(' ');

    // End creates table

    // Start inquirer npm package input prompt
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Which item ID would you like to purchase?',
          validate: function (val) {
            for (var i = 0; i < itemId.length; i++) {
              var n = itemId[i];
              if (n == val) {
                return val > 0 && val == n;
              }
            }
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
          console.log(' ');
          newPurchase();
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

// End inquirer npm package input prompt

// End displays items available for sale

// Displays total for purchase
function displayTotal(answers) {
  con.query('SELECT price FROM products WHERE item_id = ?',
          [answers.id],
          function (err, res) {
    if (err) throw err;
    var totalPrice = answers.quantity * res[0].price;
    console.log('Your total is '.info + '$' + totalPrice);
    console.log('Thank you for your purchase!'.magenta);
    console.log('Press Ctrl + C to exit');
    console.log(' ');
    con.query('UPDATE products SET product_sales = product_sales + ? WHERE item_id = ?;',
      [answers.quantity * res[0].price, answers.id],
      function (err) {
        if (err) throw err;
      });

    newPurchase();
  });
}

// End displays total for purchase

// Prompts customer for another purchase
function newPurchase() {
  inquirer
  .prompt({
      type: 'list',
      name: 'anotherPurchase',
      message: 'Would you like to make another purchase?',
      choices: [
        'Yes',
        'No'
      ]

    })

.then(function (answer) {
      switch (answer.anotherPurchase) {
        case 'Yes':
          displayItems();
          break;
        case 'No':
          console.log('Thank you, have a great day!'.magenta);
          console.log('Press Ctrl + C to exit');
      }

    });
}

// End prompts customer for another purchase

// Initializes app on connection
con.connect(function (err) {
  if (err) throw err;
  console.log(' ');
  displayItems();

});

// End Node application
