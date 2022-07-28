//References packages and associated files
const inquirer = require('inquirer');
const fs = require('fs');
// const path = require('path');
const mysql = require('mysql2');

// const Employee = require('../team_profile_generator_chal/lib/Employee');

const connection = mysql.createPool({
    host: 'localhost',
    database: 'employee_roster',
    user: 'root',
    password: 'Ptawute_iwaseko%sh13'
})



const selectPrompt = {
    type: 'list',
    name: 'browse_options',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'End'],
};



const addDeptPrompt = {
    type: 'input',
    name: 'add_department',
    message: "What is the name of the new department?"
};

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
        // choices: [DEPT LIST]
    }
]


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
        // choices: [ROLE LIST]
    },
    {
        type: 'list',
        name: 'empl_manager',
        message: "Who is the new employee's manager?",
        // choices: [MANAGER LIST]
    },
];


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


function initialPrompt() {

    return inquirer.prompt(selectPrompt)

    .then((select) => {
        switch(select.browse_options) {
            case 'View all departments':
                return FUNCTION();
            case 'View all roles':
                return FUNCTION();
            case 'View all employees':
                return Function();
            case 'Add a department':
                return Function();
            case 'Add a role':
                return FUNCTION();
            case 'Add an employee':
                return FUNCTION();
            case 'Update an employee role':
                return FUNCTION();
            default:
                return leaveSession();
        }
    })
};




function addDepartment() {
    return inquirer.prompt(addDeptPrompt)

    .then((dInput) => {

        let new_dept = new addDepartment(dInput.add_department);


        return FUNCTION();
    })
}

function addRole(addRolePrompt) {
    return inquirer.prompt()

    .then((rInput) => {

        let new_role = new addRole(rInput.role, rInput.role_salary, rInput.role_dept);
      
        return FUNCTION();
    })

}

function addEmployee() {
    return inquirer.prompt(addEmplPrompt)

    .then((eInput) => {
        
        let new_empl = new Employee(eInput.empl_firstname, eInput.empl_lastname, eInput.empl_role, eInput.empl_manager);

        return FUNCTION();
    })
}