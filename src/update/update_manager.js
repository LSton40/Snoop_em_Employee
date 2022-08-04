const db = require('../../db/connection');
const inquirer = require('inquirer');

let employee_list;
let manager_list;

//SQL to view manager names
const managerSelect = `
    SELECT 
    CONCAT(first_name, ' ', last_name) AS 'managers'
    FROM employee
    `;

//Function to change and update an employee's assigned manager
async function updateManager() {

    //Query to view all employees by their full name
    const empls = await db.query(`SELECT CONCAT(first_name, ' ', last_name) AS 'fullname' FROM employee`) 
    employee_list = empls[0].map(empl => empl.fullname)

    //Query to view all managers by full name
    const new_mgr = await db.query(managerSelect)
    manager_list = new_mgr[0].map(new_manager => new_manager.managers)

    //Prompt to select employee and their manager to be changed
    const updateMgrPrompt = [
        {
        type: 'list',
        name: 'choose_empl_chg_mgr',
        message: "Whose manager do you wish to change?",
        choices: employee_list
        },
        {
        type: 'list',
        name: 'update_mgr',
        message: "Who will be the new manager of this employee?",
        choices: manager_list
        }
    ];

    const user_sels = await inquirer.prompt(updateMgrPrompt);

    const empl_update = user_sels.choose_empl_chg_mgr;
    const mgr_update = user_sels.update_mgr;

    //Query to select the id of the employee whose manager will be updated
    const empl_id = await db.query(`SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`, empl_update)

    //Query to select the id of the manager who is to be assigned to the selected employee
    const mgr_id = await db.query(`SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`, mgr_update)

    //Query to update the selected employee's manager id to the selected manager
    const chg_data = await db.query(`UPDATE employee SET manager_id = ? WHERE id = ?`, [mgr_id[0][0].id, empl_id[0][0].id])
                
    console.log(`Successfully changed ${empl_update}'s manager to ${mgr_update}!`)
    return otherPrompt();
};

module.exports = updateManager;
const {otherPrompt} = require('../../index.js');