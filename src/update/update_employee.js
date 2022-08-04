const db = require('../../db/connection');
const inquirer = require('inquirer');

//SQL to update employee's role id based on the employee's name
const update = `
    UPDATE employee 
        SET role_id = ? 
            WHERE CONCAT(first_name, ' ', last_name) = ?
`;

let emplList;
let roleList;

//Function to update an employee
async function updateEmployee() {

    //Query to view all employee names\
    const empl_list = await db.query(`SELECT CONCAT(first_name, ' ', last_name) AS 'fullname' FROM employee`)
    emplList = empl_list[0].map(empls => empls.fullname)

    //Query to view all job roles
    const role_list = await db.query(`SELECT title FROM employee_role`) 
    roleList = role_list[0].map(roles => roles.title)

    //Prompt to update a selected employee's job role
    const updateEmplPrompt = [
        {
            type: 'list',
            name: 'empl_update',
            message: "Which employee's role would you like to update?",
            choices: emplList
        },
        {
            type: 'list',
            name: 'empl_role',
            message: "What role would you like to assign to the selected employee?",
            choices: roleList
        }
    ];

    const data = await inquirer.prompt(updateEmplPrompt);

    //Query to get id number of selected role
    const role_num = await db.query(`SELECT id FROM employee_role WHERE title = ?`, data.empl_role) 

    //Query to update selected employee's role information
    const revision = await db.query(update, [role_num[0][0].id, data.empl_update])

    console.log(`${data.empl_update}'s job title successfully updated`);
    return initialPrompt();
};

module.exports = updateEmployee;
const {initialPrompt} = require('../../index.js');