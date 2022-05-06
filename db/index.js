// importing connection to the db
const connection = require('./connection');

// Create class to store all data
class Database {
    // add connection
    constructor(connection) {
        this.connection = connection;
    };

    // Add all functions from inquirer 
    // All departments
    findAllDepartments() {
        return this.connection.promise().query("SELECT department.id, department.name AS department FROM department;");
    };
    // All roles
    findAllRoles() {
        return this.connection.promise().query("SELECT role.id, role.title AS job_title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;");
    };
    // All employees
    findAllEmployees() {
        return this.connection.promise().query("SELECT employees.id, employees.first_name, employees.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN role on employees.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employees manager on manager.id = employees.manager_id;");
    };
    // All managers
    findAllManagers(employeeId) {
        return this.connection.promise().query("SELECT id, first_name, last_name FROM employees WHERE id != ?", employeeId);
    };
    // Add departments
    addDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    };
    // Delete Departments
    deleteDepartment(departmentId) {
        return this.connection.promise().query("DELETE FROM department WHERE id = ?", departmentId);
    };
    // Add role
    addRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    };
    // Delete role
    deleteRole(roleId) {
        return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
    };
    // Add employee
    addEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employees SET ?", employee);
    };
    // Delete employee
    deleteEmployee(employeeId) {
        return this.connection.promise().query("DELETE FROM employees WHERE id = ?", employeeId);
    };
    // Update employee role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query("UPDATE employees SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    };
    // Update manager role
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.promise().query("UPDATE employees SET manager_id = ? WHERE id = ?", [managerId, employeeId]);
    };
};



// exporter for other files
module.exports = new Database(connection);