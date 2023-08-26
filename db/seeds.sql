INSERT INTO departments (department_name)
VALUES ("Security"),
       ("IT"),
       ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES ('Lead Guy', 150000, 1),
       ('Worst Guy', 100000, 2),
       ('Boss', 1000000, 3);

       
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES ('John', 'Prevost', 1, 2),
        ('Bobby', 'Miller-Joyce', 2, 1),
        ('Tommy', 'Graf', 3, 3);