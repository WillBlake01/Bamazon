// Require npm package dependencies
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

// Creates connection with mySQL database
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: 'bamazon'
});

// Initiates manager prompt
function managerPrompt() {
  console.log('Press Ctrl + C to exit');
  console.log(' ');

  // Start inquirer npm package input prompt
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

  // Start inquirer npm package input prompt
}

// End initiates manager prompt

// Provides manager view of products
function viewProducts() {
  con.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products',
    function (err, res) {
    if (err) throw err;
    console.log(' ');
    console.log('****************Items for Sale******************');

    // Table parameters
    var header = ['ID', 'Product Name', 'Price', 'Quantity'];
    var table = [];
    for (var i = 0; i < res.length; i++) {
      table.push(Object.values(res[i]));
    }

    // Creates table with word-table npm package based on above parameters
    var wt = new WordTable(header, table);
    console.log(wt.string());
    managerPrompt();
  });
}

// End provides manager view of products

// Provides manager view of products with low inventory
function viewLowInventory() {
  con.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5',
    function (err, res) {
      if (err) throw err;
      console.log(' ');
      console.log('*****************Low Quantity*******************'.warn);

      // Table parameters
      var header = ['ID', 'Product Name', 'Price', 'Quantity'];
      var table = [];
      for (var i = 0; i < res.length; i++) {
        table.push(Object.values(res[i]));
      }

      // Creates table with word-table npm package based on above parameters
      var wt = new WordTable(header, table);
      console.log(wt.string());
      managerPrompt();
    });
}

// End provides manager view of products with low inventory

// Adds manager functionality to add inventory when product is received
function addInventory() {
  con.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products',
    function (err, res) {
    if (err) throw err;
    console.log(' ');
    console.log('****************Items for Sale******************');

    var header = ['ID', 'Product Name', 'Price', 'Quantity'];
    var table = [];
    for (var i = 0; i < res.length; i++) {
      table.push(Object.values(res[i]));
    }

    // basic usage
    var wt = new WordTable(header, table);
    console.log(wt.string());
    console.log('Press Ctrl + C to exit');
    console.log(' ');

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
          console.log(' ');
          managerPrompt();
        });
      });
  });
}

// End adds manager functionality to add inventory when product is received

// Adds manager functionality to add a new product to database
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
      [answers.name.toLowerCase(), answers.department.toLowerCase(), answers.price, answers.quantity],
      function (err) {
        if (err) throw err;
        console.log('New product added!'.info);
        console.log(' ');
        managerPrompt();
      });
  });
}

// End Adds manager functionality to add a new product to database

// Initializes app on connection
con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!'.info);
  managerPrompt();
});

// End Node application
