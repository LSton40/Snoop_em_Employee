CREATE DATABASE employee_roster;

USE employee_roster;

CREATE TABLE department_table(
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employee_role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_name VARCHAR(30), --added
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_title VARCHAR(30) NOT NULL, --added
    role_id INT,
    salary DECIMAL, --added
    manager_name VARCHAR(30) NOT NULL, --added
    manager_id INT, --NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);