INSERT INTO department ( name)
VALUES ( "Engineering Department"),
( "Front Office"),
( "Human Resources"),
( "Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Engineer", 100000, 1),
("Assistant", 65094, 2),
("Resource Management", 58367, 3),
("Chief Officer", 46928, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sav", "Elsey", 1, 1),
("Sara", "de Leon", 2, 2),
("Ayano", "Aishi", 3, 3),
("Luke", "Skywalker", 4, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("NotSav", "Yee", 1, 1),
("Sarah", "Rebecca", 2, 2),
("Ann", "Takamaki", 3, 3),
("John", "Silver", 4, 4);

