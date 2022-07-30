//References packages and associated files
const inquirer = require('inquirer');
const fs = require('fs');
// const path = require('path');
const mysql = require('mysql2/promise');
const cTable = require('console.table');

// const Employee = require('../team_profile_generator_chal/lib/Employee');

const db = require('./db/connection');


const selDept = `SELECT
    id AS 'ID',
    department_name AS 'Department'
    FROM department_table
`;


function viewDepartments() {

    db.query(selDept, (err, departments) => {
        if (err) return console.log(err);

        console.table(departments);
        return initialPrompt();
    })
}

const selRole = `SELECT
    employee_role.id AS 'ID',
    employee_role.title AS 'Job Title',
    employee_role.salary AS 'Salary',
    department_table.department_name AS 'Department'
    FROM employee_role
        LEFT JOIN department_table
        ON employee_role.department_id = department_table.id
`;

function viewRoles() {

    db.query(selRole, (err, roles) => {
        if (err) return console.log(err);

        console.table(roles);
        return initialPrompt();
    })
}

const empls = `SELECT
    e.id AS 'ID',
    e.first_name AS 'First Name',
    e.last_name AS 'Last Name',
    employee_role.title AS 'Job Title',
    CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    FROM employee AS e
        LEFT JOIN employee AS m 
            ON m.id = e.manager_id
        LEFT JOIN employee_role
            ON employee_role.id = e.role_id
`;

function viewEmployees() {

    db.query(empls, (err, employees) => {
        if (err) return console.log(err);

        console.table(employees);
        return initialPrompt();
    })
}






const selectPrompt = {
    type: 'list',
    name: 'browse_options',
    message: 'What would you like to do?',
    choices: ['View all departments', 'Add a department', 'View all roles', 'Add a role', 'View all employees', 'Add an employee', 'Update an employee role', 'End'],
};


class Department {
    constructor(dept_name) {
        this.dept_name = dept_name;
    }

    getId(id) {
        return this.id = id;
    }
}


function addDepartment() {
    return inquirer.prompt(addDeptPrompt)

    .then((dInput) => {

        let new_dept = new Department(dInput.add_department);
        console.log(new_dept);

        db.query(`INSERT INTO department_table (department_name) VALUES (?)`, new_dept.dept_name, (err, data) => {
            if (err) return console.log(err);
    
            new_dept.getId(data.insertId);

            // console.log(new_dept);
            console.log(`${new_dept.dept_name} department successfully added`);
            return initialPrompt();
        })
        return;
    })
};


const addDeptPrompt = {
    type: 'input',
    name: 'add_department',
    message: "What is the name of the new department?"
};




const addToDept = () => {
    let deptArr = [];
    db.query(`SELECT department_name FROM department_table`, (err, data) => {
        if (err) return console.log(err);

        deptArr.push(data.department_name);
        console.log(deptArr);
    })
    return deptArr;
}


class Role extends Department{
    constructor(role, salary, dept) {
        super(dept);
        this.role = role;
        this.salary = salary;
    }

    getDeptId() {
        return this.dept.id;
    }

    getRoleId(id) {
        return this.id = id;
    }
}

const roleSet = `
    INSERT INTO employee_role
        (title, salary, department_id)
        VALUES (${new_role.role}, ${new_role.salary}, ${new_role.getDeptId()})
    `;

function addRole() {
    return inquirer.prompt(addRolePrompt)

    .then((rInput) => {

        let new_role = new Role(rInput.role, rInput.role_salary, rInput.role_dept);

        db.query(roleSet, (err, data) => {
            if (err) return console.log(err);
    
            new_role.getRoleId(data.insertId);
            console.log(`${new_role.role} job title successfully added`);
            return initialPrompt();
        })
        return;
    })
}


const addRolePrompt = [
    {
        type: 'input',
        name: 'role',
        message: "What is the name of the new job role?"
    },
    {
        type: 'input',
        name: 'role_salary',
        message: "What is the base salary of the new role?"
    },
    {
        type: 'list',
        name: 'role_dept',
        message: "Under which department does the role fall?",
        choices: addToDept()
    }
]

// function addToDept() {
//     return db.query('SELECT department_name FROM department_table', (err, departments) => {
//         if (err) return console.log(err);

//         return departments;
//     })
// }




const addEmplPrompt = [
    {
        type: 'input',
        name: 'empl_firstname',
        message: "What is the new employee's first name?"
    },
    {
        type: 'input',
        name: 'empl_lastname',
        message: "What is the new employee's last name?"
    },
    {
        type: 'list',
        name: 'empl_role',
        message: "What is the new employee's role?",
        // choices: addToRole() [ROLE LIST] ${employee_role.title}
    },
    {
        type: 'list',
        name: 'empl_manager',
        message: "Who is the new employee's manager?",
        // choices: addMgtToEmpl() [MANAGER LIST] ${employee.first_name} ${employee.last_name}
    },
];

const updateEmplPrompt = [
    {
        type: 'list',
        name: 'empl_update',
        message: "Which employee's role would you like to update?",
        // choices: selectEmplUpdate() [MANAGER LIST] ${employee.first_name} ${employee.last_name}
    },
    {
        type: 'list',
        name: 'empl_role',
        message: "What role would you like to assign to the selected employee?",
        // choices: selectRoleUpdate() [ROLE LIST] ${employee_role.title}
    }
]


function initialPrompt() {

    return inquirer.prompt(selectPrompt)

    .then((select) => {
        switch(select.browse_options) {
            case 'View all departments':
                return viewDepartments();
            case 'Add a department':
                return addDepartment();
            case 'View all roles':
                return viewRoles();
            case 'Add a role':
                return addRole();
            case 'View all employees':
                return viewEmployees();
            // case 'Add an employee':
            //     return addEmployee();
            // case 'Update an employee role':
            //     return updateEmployee();
            default:
                return leaveSession();
        }
    })
};






/*
Update employee managers.

View employees by manager.

View employees by department.

Delete departments, roles, and employees.

View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.


const otherOptions = {
    type: 'list',
    name: 'addl_options',
    message: 'What would you like to do?',
    choices: ['Update employee managers', 'View employees by manager', 'View employees by department', 'View total department budget', 'Delete a department', 'Delete a role', 'Delete an employee', 'End'],
};


function otherPrompt() {

    return inquirer.prompt(selectPrompt)

    .then((select) => {
        switch(select.browse_options) {
            case 'Update employee managers':
                return FUNCTION();
            case 'View employees by manager':
                return FUNCTION();
            case 'View employees by department':
                return Function();
            case 'View total department budget':
                return Function();
            case 'Delete a department':
                return FUNCTION();
            case 'Delete a role':
                return FUNCTION();
            case 'Delete an employee':
                return FUNCTION();
            default:
                return leaveSession();
        }
    })
};



*/

initialPrompt();