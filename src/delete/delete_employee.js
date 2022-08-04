const db = require('../../db/connection');
const inquirer = require('inquirer');

//Function to delete an employee from the database
async function deleteEmployee() {

    //Query to view all employee full names (first + last)
    const empls = await db.query(`SELECT CONCAT(first_name, ' ', last_name) AS 'fullname' FROM employee`)
    const empl_list = empls[0].map(empl => empl.fullname)

    //Prompt to select an employee to delete
    const delEmplPrompt = {
        type: 'list',
        name: 'del_employee',
        message: "Which employee do you wish to terminate, you monster?",
        choices: empl_list
    };

    const empl_sel = await inquirer.prompt(delEmplPrompt);
    const select_empl = empl_sel.del_employee;

    //Query to get id number of selected employee
    const empl_id = await db.query(`SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`, select_empl);

    //Query to remove the selected employee as manager if they were another employee's manager
    const mgr_del = await db.query(`UPDATE employee SET manager_id = null WHERE manager_id = ?`, empl_id[0][0].id);
                
    //Query to delete the selected employee from the database
    const del_data = await db.query(`DELETE FROM employee WHERE id = ?`, empl_id[0][0].id);
            
    console.log(`${select_empl} successfully terminated! Good riddance!`);
    return otherPrompt();
};

module.exports = deleteEmployee;
const {otherPrompt} = require('../../index.js');