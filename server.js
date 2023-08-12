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
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ]);

  if (!name) {
    return res.status(400).json({ error: 'Department name is required.' });
  }

  const sql = 'INSERT INTO departments (name) VALUES (?)';

  db.query(sql, [name], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while adding the department.' });
    } else {
      res.json({ message: 'Department added successfully.', departmentId: result.insertId });
    }
  });
};

const addEmployee = async (req, res) => {
  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee you want to update:',
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the new role ID for the employee:',
    },
  ]);

  if (!employeeId || !roleId) {
    return res.status(400).json({ error: 'Both employee ID and role ID are required.' });
  }

  const sql = 'UPDATE employees SET role_id = ? WHERE id = ?';
  db.query(sql, [roleId, employeeId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while updating the employee role.' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Employee not found.' });
    } else {
      res.json({ message: 'Employee role updated successfully.' });
    }
  });
};

const addRole = async (req, res) => {
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:',
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the department ID for the role:',
    },
  ]);

  if (!title || !salary || !departmentId) {
    return res.status(400).json({ error: 'Role title, salary, and department ID are required.' });
  }

  const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';

  db.query(sql, [title, salary, departmentId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while adding the role.' });
    } else {
      res.json({ message: 'Role added successfully.', roleId: result.insertId });
    }
  });
};

const updateEmployeeRole = async (req, res) => {
  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee you want to update:',
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the new role ID for the employee:',
    },
  ]);

  if (!employeeId || !roleId) {
    return res.status(400).json({ error: 'Both employee ID and role ID are required.' });
  }

  const sql = 'UPDATE employees SET role_id = ? WHERE id = ?';
  db.query(sql, [roleId, employeeId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while updating the employee role.' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Employee not found.' });
    } else {
      res.json({ message: 'Employee role updated successfully.' });
    }
  });
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
