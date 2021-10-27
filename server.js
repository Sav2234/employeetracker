const inquirer = require("inquirer")
const connection = require('./db/connection.js');

const allCreation = [];

function startMenu() {
    inquirer.prompt(
        // "Remove Employee", "Remove Department", "Remove Role", 
        {
            type: "list",
            message: "What would ypu like to do today?",
            name: "action",
            choices: ["Add Employee", "Add Department", "Add Role", "Nothing", "View all Roles", "View all Employees", "View all Departments"
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

        else if (response.action === "Nothing") {
            Creation()
        }

        // else if (response.action === "Remove Employee") {
        //     rmvEmployee()
        // }

        // else if (response.action === "Remove Department") {
        //     rmvDepartment()
        // }

        // else if (response.action === "Remove Role") {
        //     rmvRole()
        // }

        else if (response.action === "View all Employees") {
            viewEmp()
        }

        else if (response.action === "View all Roles") {
            viewRoles()
        }

        else if (response.action === "View all Departments") {
            viewDep()
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
                name: "id",
                message: "What is the employee's ID?",
            },

            {
                type: "input",
                name: "empRoleID",
                message: "What is the employee's role ID?",
            },

            {
                type: "input",
                name: "manager_id",
                message: "Does the employee have a manager ID? If so please enter a value. If not, type 'null'.",
            },
        ]).then(response => {
            console.log(response + "Employee Created")
            allCreation.push()
            addMore()
        })
    }

    function addDepartment() {
        inquirer.prompt([
            {
                type: "input",
                name: "DepName",
                message: "What would you like to call the department?",
            },

            {
                type: "input",
                name: "DepID",
                message: "What is the department's ID?",
            },


        ]).then(response => {
            console.log(response + "Department Created")
            allCreation.push(addDepartment)
            addMore()
        })
    }

    function addRole() {
        inquirer.prompt([
            {
                type: "input",
                name: "role_id",
                message: "Give the role an ID",
            },

            {
                type: "input",
                name: "role_title",
                message: "What is the role's title?",
            },

            {
                type: "input",
                name: "role_salary",
                message: "What is the salary for this role?",
            },

            {
                type: "input",
                name: "DepID",
                message: "What is the corresponding ID of the department for this role?",
            },
        ]).then(response => {
            console.log(response + "Role Created")
            allCreation.push(addRole)
            addMore()
        })
    }

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
            Creation()
        }
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

startMenu();