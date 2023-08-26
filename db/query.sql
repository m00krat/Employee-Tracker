SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

SELECT title, department_name as departments, salary FROM roles
JOIN departments ON roles.department_id = department.id;

SELECT e.first_name, e.last_name, title, department_name 
AS departments, salary, m.first_name AS manager FROM employees e
JOIN role ON e.role_id = role.id
JOIN departments ON role.department_id = department.id
LEFT JOIN employees m ON m.id = e.manager_id;