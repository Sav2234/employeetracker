const { restoreDefaultPrompts } = require("inquirer");
const inquirer = require("inquirer")
const connection = require('./db/connection.js');

const allCreation = [];

function startMenu() {
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do today?",
            name: "action",
            choices: ["Add Employee", "Add Department", "Add Role", "View all Roles", "View all Employees", "View all Departments", "Remove Employee", "Remove Role", "Remove Department", "Nothing"
            ]
        }
    ).then(function (response) {
        console.log(response.action)
        if (response.action === "Add Employee") {
            addEmployee()
        }

        else if (response.action === "Add Department") {
            addDepartment()
        }

        else if (response.action === "Add Role") {
            addRole()
        }

        else if (response.action === "Remove Employee") {
            rmvEmployee()
        }

        else if (response.action === "Remove Department") {
            rmvDepartment()
        }

        else if (response.action === "Remove Role") {
            rmvRole()
        }

        else if (response.action === "View all Employees") {
            viewEmp()
        }

        else if (response.action === "View all Roles") {
            viewRoles()
        }

        else if (response.action === "View all Departments") {
            viewDep()
        }
        else if (response.action === "Nothing") {
            exitMenu()
        }
    })

    function addEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?",
            },

            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?",
            },

            {
                type: "input",
                name: "role_id",
                message: "What is the employee's role ID?",
            },

            {
                type: "input",
                name: "manager_id",
                message: "Does the employee have a manager ID? If so please enter a value.",
            },
        ]).then(response => {
            console.log(response)
            connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [response.first_name, response.last_name, response.role_id, response.manager_id], function (error, res) {
                if (error) throw error;
                console.table(res);
                addMore()
            })
            // addMore()
        })
    }

    function addDepartment() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What would you like to call the department?",
            },


        ]).then(response => {
            console.log("Department Created", response)
            connection.query(`INSERT INTO department (name) VALUES (?)`, [response.name], function (error, res) {
                if (error) throw error;
                // console.table(res);
                addMore()
            })
        })
    }

    function addRole() {
        inquirer.prompt([

            {
                type: "input",
                name: "title",
                message: "What is the role's title?",
            },

            {
                type: "input",
                name: "salary",
                message: "What is the salary for this role?",
            },

            {
                type: "input",
                name: "department_id",
                message: "What is the corresponding ID of the department for this role?",
            },
        ]).then(response => {
            console.log("Role Created", response)
            connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [response.title, response.salary, response.department_id], function (error, res) {
                if (error) throw error
                // console.table(res);
                addMore()
            })
        })
    }

    function rmvEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the ID of the employee you would like to remove?",
            },


        ]).then(response => {
            console.log(response + "Employee Deleted")

            connection.query(`DELETE FROM employee WHERE id = (?)`, [response.id], (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
            });

            // Query database
            connection.query('SELECT * FROM EMPLOYEE', function (err, results) {
                console.log(results);
                addMore()
            });
        })
    }

    function rmvRole() {
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the ID of the role you would like to remove?",
            },


        ]).then(response => {
            console.log(response + "Role Deleted")

            connection.query(`DELETE FROM role WHERE id = (?)`, [response.id], (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
            });

            // Query database
            connection.query('SELECT * FROM ROLE', function (err, results) {
                console.log(results);
                addMore()
            });
        })
    }

    function rmvDepartment() {
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the ID of the department you would like to remove?",
            },


        ]).then(response => {
            console.log(response + "Department Deleted")

            connection.query(`DELETE FROM department WHERE id = (?)`, [response.id], (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
            });

            // Query database
            connection.query('SELECT * FROM DEPARTMENT', function (err, results) {
                console.log(results);
                addMore()
            });
        })
    }


    function viewRoles() {
        connection.query("SELECT * FROM ROLE", function (error, res) {
            if (error) throw error;
            console.table(res);
            startMenu()
        })
    }

    function viewEmp() {
        connection.query("SELECT * FROM EMPLOYEE", function (error, res) {
            if (error) throw error;
            console.table(res);
            startMenu()
        })
    }

    function viewDep() {
        connection.query("SELECT * FROM DEPARTMENT", function (error, res) {
            if (error) throw error;
            console.table(res);
            startMenu()
        })
    }

}
function exitMenu() {
    console.log("Now ending process")
    process.exit()
}

function addMore() {
    inquirer.prompt([
        {
            type: "list",
            name: "more",
            message: "Would you like to do anything else?",
            choices: ["Yes", "No"]
        }
    ]).then(response => {
        if (response.more === "Yes") {
            startMenu()
        }

        else if (response.more === "No") {
            console.log("Ending process")
            exitMenu()
        }
    })
}



startMenu();