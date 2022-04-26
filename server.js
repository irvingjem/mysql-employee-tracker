const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

require('dotenv').config();

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: process.env.DB_USER,
        // Your MySQL password
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    console.log('Connected to the employee tracker database.')

);


function userPrompts() {
    inquirer.prompt(
            [{
                type: "list",
                message: "What would you like to do?",
                choices: ['View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Delete a department',
                    'Add a role',
                    'Delete a role',
                    'Add an employee',
                    'Delete an employee',
                    "Update an employee's role",
                    "Update an employee's manager",
                    'Exit'
                ],
                name: 'userNav'

            }]
        )
        .then(answer => {
            let choice = answer.choice;
            switch (choice) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Delete a department':
                    deleteDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Delete a role':
                    deleteRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Delete an employee':
                    deleteEmployee();
                    break;
                case "Update an employee's role":
                    updateEmployeeRole();
                    break;
                case "Update an employee's manager":
                    updateEmployeeManager();
                    break;
                default:
                    exit();
            }
        });
};

// Functions needed
// View all departments
const viewAllDepartments = () => {
    db.findAllDepartments()
        // create readability of parsed data 
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => userPrompts());
};
// View all roles
const viewAllRoles = () => {
    db.findAllRoles()
        // create readability of parsed data 
        .then(([rows]) => {
            let roles = rows;
            console.table(roles);
        })
        // send user back to prompts
        .then(() => userPrompts());
};
// Add department
const addDepartment = () => {
    inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'Please enter a name for the department!'
        }])
        .then(res => {
            let name = res;
            db.addDepartment(name)
                .then(() => console.log(`Added ${name.name} to the database!`))
                .then(() => userPrompts());
        });
};
// Delete department
const deleteDepartment = () => {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentNames = departments.map(({ id, department }) => ({
                name: department,
                value: id
            }));

            inquirer.prompt([{
                    type: 'list',
                    name: 'department',
                    message: 'What department would you like to remove?',
                    choices: departmentNames
                }])
                .then(res => db.deleteDepartment(res.department))
                .then(() => console.log('You have removed a department!'))
                .then(() => userPrompts());
        });
};

// Add a role
const addRole = () => {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;

            // map through departments and turn them into an array
            const departmentNames = departments.map(({ id, department }) => ({
                name: department,
                value: id
            }));

            // Questions for getting user information
            inquirer.prompt([{
                        type: 'input',
                        name: 'title',
                        message: 'Please enter a name for the role!'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Please enter the salary for the role'
                    },
                    {
                        type: 'list',
                        name: 'department_id',
                        message: 'Please indicate which department this role is apart of',
                        choices: departmentNames
                    }
                ])
                .then(role => {
                    db.addRole(role)
                        .then(() => console.log(`Added ${role.title} to the database successfully!`))
                        .then(() => userPrompts());
                });
        });
};

// Delete a Role
const deleteRole = () => {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleNames = roles.map(({ id, job_title }) => ({
                name: job_title,
                value: id
            }));

            inquirer.prompt([{
                    type: 'list',
                    name: 'role',
                    message: 'Which role would you like to remove?',
                    choices: roleNames
                }])
                .then(res => db.deleteRole(res.role))
                .then(() => console.log('Role has been removed from the database!'))
                .then(() => userPrompts());
        });
};
// Add an Employee
const addEmployee = () => {
        inquirer.prompt([{
                    type: 'input',
                    name: 'first_name',
                    message: "Please enter the employee's first name"
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "Please enter the employee's last name"
                }
            ])
            // Delete an employee
            // Update an employee
            // Update an employee manager


        //Function to exit application
        const exit = () => {
            console.log("Goodbye")
            process.exit(0);
        }




        //start point 
        userPrompts();