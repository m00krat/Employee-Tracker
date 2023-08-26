DROP DATABSE IF EXISTS employee_db;
CREATE DATABSE employee_db;
USE employee_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    department_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    title VARCHAR(50) NOT NULL,
    department_id INT, 
    salary INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    PRIMARY KEY(id),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    manager_id INT
);
