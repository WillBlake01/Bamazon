DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price FLOAT(10,2),
    stock_quantity INT(10),
    product_sales FLOAT(10,2),
    PRIMARY KEY (item_id)
);

CREATE TABLE departments(
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(255),
    over_head_costs FLOAT(10,2),
    PRIMARY KEY (department_id)
);
