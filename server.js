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

//ask the question again 
userPrompts();
});

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
                .then(() => console.log(`Added ${name.name} to the database successfully!`))
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

                // Delete a Role
                // Add an Employee
                // Delete an employee
                // Update an employee
                // Update an employee manager


            } else {
                //Function to exit application

                console.log("Goodbye")
                process.exit(0);
            }
        });
}


//start point 
userPrompts();