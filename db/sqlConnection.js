// Require npm package dependencies
import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config()

// Creates connection with mySQL database
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  port: '3306',
  database: 'bamazon',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})

export { con };
