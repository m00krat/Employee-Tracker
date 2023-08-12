import inquirer from 'inquirer';

const {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addEmployee,
  addRole,
  updateEmployeeRole,
} = require('./server.js');

const mainMenu = async () => {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add an employee',
        'Add a role',
        'Update an employee role',
        'Exit',
      ],
    },
  ]);

  switch (choice) {
    case 'View all departments':
      viewDepartments();
      break;
    case 'View all roles':
      viewRoles();
      break;
    case 'View all employees':
      viewEmployees();
      break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Add a role':
      addRole();
      break;
    case 'Update an employee role':
      updateEmployeeRole();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit(0);
    default:
      console.log('Invalid choice');
      mainMenu();
  }
};

mainMenu();
