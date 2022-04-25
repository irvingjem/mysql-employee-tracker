USE employeesdb;

INSERT INTO department (name) 
VALUES ('Sales'),
('Finance'),
('Human Resources'),
('Opperations');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 80000, 1),
('Salesperson', 40000, 1),
('Account Manager', 120000, 2),
('Accountant', 100000, 2),
('Legal Team Leader', 300000, 3),
('Lawyer', 200000, 3),
('Lead Engineer', 300000, 4),
('Software Engineer', 250000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Tim', 'Simmons', 1, NULL),
('Nick', 'Nickleson', 2, 1),
('Sarah', 'Jackson', 3, NULL),
('Lisa', 'Williams', 4, 3),
('Alex', 'Alexson', 5, NULL),
('Aaron', 'Lukas', 6, 5),
('Matthew', 'Taylor', 7, NULL),
('Robert', 'Taylor', 8, 7) ;
