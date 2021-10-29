DROP DATABASE IF EXISTS mysara_db;
CREATE DATABASE mysara_db;
USE mysara_db;

CREATE TABLE department
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee
(
   id INT PRIMARY KEY AUTO_INCREMENT,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT, FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
   manager_id INT, FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);