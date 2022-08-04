const db = require('../../db/connection');
const inquirer = require('inquirer');
const Employee = require('../../classes/Employee');

//SQL to view all employee managers
const managerSelect = `
    SELECT 
        CONCAT(first_name, ' ', last_name) AS 'managers'
    FROM employee
`;

//SQL to add a new employee first and last name, role id, and manager id
const emplSet = `
    INSERT INTO employee
    SET
        first_name = ?,
        last_name = ?,
        role_id = ?,
        manager_id = ?
`;

let roleArray;
let managerArray;

//Function to add employee
async function addEmployee() {

    //Query to view all roles (job titles) 
    const role_data = await db.query(`SELECT title FROM employee_role`) 
    roleArray = role_data[0].map(role => role.title)
    
    //Query to view all possible manager names
    const manager_data = await db.query(managerSelect) 
    managerArray = manager_data[0].map(managers => managers.managers)
        
    //Prompt questions for adding an employee
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
            choices: roleArray
        },
        {
            type: 'list',
            name: 'empl_manager',
            message: "Who is the new employee's manager?",
            choices: managerArray
        },
    ];

    const eInput = await inquirer.prompt(addEmplPrompt);
     
    //Defines a new holding object of the Employee class
    let new_empl = new Employee(eInput.empl_firstname, eInput.empl_lastname, eInput.empl_role, eInput.empl_manager);

    //Query to get id number of the selected job role
    const role_num = await db.query(`SELECT id FROM employee_role WHERE title = ?`, new_empl.role);
            
    //Query to get id number of the selected manager
    const mgr_num = await db.query(`SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`, new_empl.manager) 
                        
    //Query to add the new employee information
    const fin_data = await db.query(emplSet, [new_empl.first_name, new_empl.last_name, role_num[0][0].id, mgr_num[0][0].id ])
    new_empl.getEmplId(fin_data.insertId);

    console.log(`${new_empl.first_name} ${new_empl.last_name} successfully hired`);
    return initialPrompt();
};

module.exports = addEmployee;
const {initialPrompt} = require('../../index.js');