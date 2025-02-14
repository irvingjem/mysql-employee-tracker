DROP DATABASE IF EXISTS employeesdb;
CREATE DATABASE employeesdb;

USE employeesdb;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (30) NOT NULL
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT  PRIMARY KEY,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    department_id INTEGER , 
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);


CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT  PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE, 
    FOREIGN KEY (manager_id) REFERENCES employee(id)  ON DELETE SET NULL
);