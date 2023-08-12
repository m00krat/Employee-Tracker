const inquirer = require('inquirer');
const db = require('..');
const Table = require('cli-table3');


const viewDepartments = (req, res) => {
  db.query('SELECT * FROM departments', (err, departments) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while fetching departments' });
    } else {
      const table = new Table({
        head: ['Department ID', 'Department Name'],
      });
      departments.forEach((department) => {
        table.push([department.id, department.name]);
      });
      console.log(table.toString());
      res.json(departments);
    }
  });
};

const viewRoles = (req, res) => {
  db.query('SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id', (err, roles) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while fetching roles' });
    } else {
      const table = new Table({
        head: ['Role ID', 'Title', 'Salary', 'Department'],
      });
      roles.forEach((role) => {
        table.push([role.id, role.title, role.salary, role.department]);
      });
      console.log(table.toString());
      res.json(roles);
    }
  });
};

const viewEmployees = (req, res) => {
  db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS managers ON employees.manager_id = managers.id', (err, employees) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while fetching employees' });
    } else {
      const table = new Table({
        head: ['Employee ID', 'First Name', 'Last Name', 'Title', 'Salary', 'Department', 'Manager'],
      });
      employees.forEach((employee) => {
        table.push([employee.id, employee.first_name, employee.last_name, employee.title, employee.salary, employee.department, employee.manager]);
      });
      console.log(table.toString());
      res.json(employees);
    }
  });
};

const addDepartment = async (req, res) => {
  
};

const addEmployee = async (req, res) => {
  
};

const addRole = async (req, res) => {
  
};

const updateEmployeeRole = async (req, res) => {
  
};

module.exports = {
  viewDepartments,
  viewEmployees,
  viewRoles,
  addDepartment,
  addEmployee,
  addRole,
  updateEmployeeRole,
};
