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
