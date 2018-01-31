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
  console.log('Press Ctrl + C to exit');
  console.log(' ');
  supervisorPrompt();
});

function supervisorPrompt() {
  inquirer
  .prompt({
      type: 'list',
      name: 'supervisor',
      message: 'What would you like to do?',
      choices: [
        'View Product Sales by Department',
        'Create New Department'
      ]

    })

.then(function (answer) {
    switch (answer.supervisor) {
      case 'View Product Sales by Department':
        viewSales();
        break;

      case 'Create New Department':
        createDepartment();
        break;
    }
  });
}

function viewSales() {
  con.query(
    'SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales FROM departments LEFT JOIN products ON products.department_name = departments.department_name GROUP BY department_id',
    function (err, res) {
    if (err) throw err;

    console.log(' ');
    console.log('*********************************************Item Analysis*********************************************');

    var header = ['ID', 'Department Name', 'Overhead Cost', 'Product Sales', 'Total Profit'];
    var table = [];
    var profit = (res.product_sales - res.over_head_costs);
    for (var i = 0; i < res.length; i++) {
      table.push(Object.values(res[i]));
    }

    // basic usage
    var wt = new WordTable(header, table);
    console.log(wt.string());
    console.log(' ');
    supervisorPrompt();
  });
}

function createDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the new department name?',
        validate: function (val) {
          return val !== '';
        },
      },
      {
        type: 'input',
        name: 'costs',
        message: 'What are the overhead costs for this department?',
        validate: function (val) {
          return val !== '';
        },
      },
  ])

  .then(function (answers) {
    con.query('INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)',
      [answers.name.toLowerCase(), answers.costs],
      function (err) {
        if (err) throw err;
        console.log('New department added!'.info);
        console.log(' ');
        supervisorPrompt();
      });
  });
}
