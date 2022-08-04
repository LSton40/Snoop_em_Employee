const db = require('../../db/connection');
const inquirer = require('inquirer');

//Function to delete a job role from the database
async function deleteRole() {

    //Query to view all job roles in the database
    const roles = await db.query(`SELECT title FROM employee_role`)
    const role_list = roles[0].map(role => role.title)
        
    //Prompt to select a role to delete
    const delRolePrompt = {
        type: 'list',
        name: 'del_role',
        message: "Which job position do you want to delete?",
        choices: role_list
    };

    const role_sel = await inquirer.prompt(delRolePrompt);
    const select_role = role_sel.del_role;

    //Query to get the id number of the role to be deleted
    const role_id = await db.query(`SELECT id FROM employee_role WHERE title = ?`, select_role);
    const roleId = role_id[0][0].id;

    //Query to get the names of any employees who are currently assigned to the selected role
    const empl_reassign = await db.query(`SELECT CONCAT(first_name, ' ', last_name) AS 'fullname' FROM employee WHERE role_id = ?`, roleId);
    const employee_names = empl_reassign[0].map(empl => empl.fullname).join(", ");

    //Query to set the role id to null for any employees who were assigned to the selected role to be deleted
    const empl_update = await db.query(`UPDATE employee SET role_id = null WHERE role_id = ?`, roleId);
                
    //Query to delete the selected role from the database
    const del_data = await db.query(`DELETE FROM employee_role WHERE id = ?`, roleId);
                    
    console.log(`${select_role} position successfully deleted.`);
    
    //Reminder message to update the roles of any employees who had been assigned to the deleted role
    if (employee_names != "") {
        console.log(`${employee_names} is/are to be reassigned to another position!`);
    };

    return otherPrompt();                  
};

module.exports = deleteRole;
const {otherPrompt} = require('../../index.js');