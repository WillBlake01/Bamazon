// Require npm package dependencies
import inquirer from 'inquirer';
import WordTable from 'word-table';
import { con } from './db/sqlConnection.js'
import colors from './config/colors.js'

// Initiates supervisor prompt
function supervisorPrompt() {
  console.log('Press Ctrl + C to exit');
  console.log(' ');

  // Start inquirer npm package input prompt
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

  // End inquirer npm package input prompt
}

// End initiates supervisor prompt

// Provides supervisor sales view
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
    supervisorPrompt();
  });
}

// End provides supervisor sales view

// Provides supervisor functionality to create a new department
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

// End supervisor functionality to create a new department

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!'.info);
  supervisorPrompt();
});
