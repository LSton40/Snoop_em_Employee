const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

//Prompt questions for main menu
const selectPrompt = {
    type: 'list',
    name: 'browse_options',
    message: 'What would you like to do?',
    choices: ['View all departments', 'Add a department', 'View all roles', 'Add a role', 'View all employees', 'Add an employee', 'Update an employee role', 'View other options', 'End'],
};

//Prompt questions for secondary 'Other Options' menu
const otherOptions = {
    type: 'list',
    name: 'addl_options',
    message: 'What would you like to do?',
    choices: ['Update employee managers', 'View employees by manager', 'View employees by department', 'View total department budget', 'Delete a department', 'Delete a role', 'Delete an employee', 'Return to main menu', 'End'],
};

//Main Menu function
async function initialPrompt() {

    const select = await inquirer.prompt(selectPrompt);

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
            case 'Add an employee':
                return addEmployee();
            case 'Update an employee role':
                return updateEmployee();
            case 'View other options':
                return otherPrompt();
            default:
                return leaveSession();
        };
};

//Additional Menu function
async function otherPrompt() {

    const select = await inquirer.prompt(otherOptions);

        switch(select.addl_options) {
            case 'Update employee managers':
                return updateManager();
            case 'View employees by manager':
                return viewEmplMgr();
            case 'View employees by department':
                return viewEmplDept();
            case 'View total department budget':
                return viewDeptBudget();
            case 'Delete a department':
                return deleteDept();
            case 'Delete a role':
                return deleteRole();
            case 'Delete an employee':
                return deleteEmployee();
            case 'Return to main menu':
                return initialPrompt();
            default:
                return leaveSession();
        }
};

//Function to terminate session
function leaveSession() {
    console.log('Goodbye!');
    return;
};

//Initialize Main Menu
initialPrompt();

module.exports = {initialPrompt, otherPrompt};

const viewDepartments = require('./src/view/view_departments');
const viewRoles = require('./src/view/view_roles');
const viewEmployees = require('./src/view/view_employees');
const viewEmplMgr = require('./src/view/view_employee_by_manager');
const viewEmplDept = require('./src/view/view_employee_by_dept');
const viewDeptBudget = require('./src/view/view_dept_budget');

const addDepartment = require('./src/add/add_department');
const addRole = require('./src/add/add_role');
const addEmployee = require('./src/add/add_employee');

const deleteDept = require('./src/delete/delete_department');
const deleteRole = require('./src/delete/delete_role');
const deleteEmployee = require('./src/delete/delete_employee');

const updateEmployee = require('./src/update/update_employee');
const updateManager = require('./src/update/update_manager');