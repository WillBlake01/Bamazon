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
  managerPrompt();
});

function managerPrompt() {
  inquirer
  .prompt({
      type: 'list',
      name: 'manager',
      message: 'What would you like to do?',
      choices: [
        'View Products for Sale',
        'View Low Inventory',
        'Add to Inventory',
        'Add New Product'
      ]

    })

.then(function (answer) {
    switch (answer.manager) {
      case 'View Products for Sale':
        viewProducts();
        break;

      case 'View Low Inventory':
        viewLowInventory();
        break;

      case 'Add to Inventory':
        addInventory();
        break;

      case 'Add New Product':
        addProduct();
        break;
    }
  });
}

function viewProducts() {
  con.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products',
    function (err, res) {
    if (err) throw err;
    console.log('****************Items for Sale******************');

    var header = ['ID', 'Product Name', 'Price', 'Quantity'];
    var table = [];
    for (var i = 0; i < res.length; i++) {
      table.push(Object.values(res[i]));
    }

    // basic usage
    var wt = new WordTable(header, table);
    console.log(wt.string());
  });
}

function viewLowInventory() {
  con.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5',
    function (err, res) {
      if (err) throw err;
      console.log('*****************Low Quantity*******************'.warn);

      var header = ['ID', 'Product Name', 'Price', 'Quantity'];
      var table = [];
      for (var i = 0; i < res.length; i++) {
        table.push(Object.values(res[i]));
      }

      // basic usage
      var wt = new WordTable(header, table);
      console.log(wt.string());
    });
}

function addInventory() {
  con.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products',
    function (err, res) {
    if (err) throw err;
    console.log('****************Items for Sale******************');

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
          message: 'Which item ID would you like to add inventory?',
          validate: function (val) {
            return val > 0 && val <= res.length;
          },
        },
        {
          type: 'input',
          name: 'quantity',
          message: 'How many would you like to add?',
          validate: function (val) {
            return val !== '' && val > 0;
          },
        },
    ])

    .then(function (answers) {
        con.query
        ('UPDATE products SET stock_quantity = stock_quantity + ?',
        [answers.quantity],
        function (err) {
          if (err) throw err;
          console.log('Stock quantity updated!'.info);
        });
      });
  });
}

function addProduct() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the new product name?',
        validate: function (val) {
          return val !== '';
        },
      },
      {
        type: 'input',
        name: 'department',
        message: 'What is the new product department?',
        validate: function (val) {
          return val !== '';
        },
      },
      {
        type: 'input',
        name: 'price',
        message: 'What is the new product price?',
        validate: function (val) {
          return val !== '' && val > 0;
        },
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'What is the new product quantity?',
        validate: function (val) {
          return val !== '' && val > 0;
        },
      },
  ])

  .then(function (answers) {
    con.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)',
      [answers.name, answers.department, answers.price, answers.quantity],
      function (err) {
        if (err) throw err;
        console.log('New product added!'.info);
      });
  });
}
