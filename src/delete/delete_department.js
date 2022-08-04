const db = require('../../db/connection');
const inquirer = require('inquirer');

//Function to delete a department
async function deleteDept() {

    //Query to view a list of all department names
    const depts = await db.query(`SELECT department_name FROM department_table`);
    const dept_list = depts[0].map(dept => dept.department_name);
    
    //Prompt to select which department to delete
    const delDeptPrompt = {
        type: 'list',
        name: 'del_department',
        message: "Which department do you want to delete?",
        choices: dept_list
    };

    const dept_sel = await inquirer.prompt(delDeptPrompt);
    const dept_select = dept_sel.del_department;

    //Query to get id number of selected department
    const dept_id = await db.query(`SELECT id FROM department_table WHERE department_name = ?`, dept_select);
    const departId = dept_id[0][0].id;

    //Query to get the titles of any job roles that fall under the selected department
    const role_reassign = await db.query(`SELECT title FROM employee_role WHERE department_id = ?`, departId)
    const role_titles = role_reassign[0].map(role => role.title).join(", ");
        
    //Query to set the department id to null for any roles that were assigned to the selected department to be deleted
    const role_update = await db.query(`UPDATE employee_role SET department_id = null WHERE department_id = ?`, departId);      

    //Query to delete the selected department
    const del_data = await db.query(`DELETE FROM department_table WHERE id = ?`, departId);
                                    
    console.log(`${dept_select} department successfully delete`)

    //Reminder message to reassign or delete any roles that fell under the deleted department
    if (role_titles != "") {
        console.log(`${role_titles} is/are to be reassigned to another department or deleted!`);
    };

    return otherPrompt();
};

module.exports = deleteDept;
const {otherPrompt} = require('../../index.js');