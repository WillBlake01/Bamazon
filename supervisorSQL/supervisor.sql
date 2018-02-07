USE bamazon;
CREATE TABLE departments(
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(255),
    over_head_costs FLOAT(10,2),
    PRIMARY KEY (department_id)
);
