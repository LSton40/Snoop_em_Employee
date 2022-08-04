const db = require('../../db/connection');
const inquirer = require('inquirer');
const Department = require('../../classes/Department');

//Menu prompt for adding a department
const addDeptPrompt = {
    type: 'input',
    name: 'add_department',
    message: "What is the name of the new department?"
};

//Function to add a department
async function addDepartment() {
    
    const dInput = await inquirer.prompt(addDeptPrompt);

    let new_dept = new Department(dInput.add_department);

    //Query to add department to database
    let dataId = await db.query(`INSERT INTO department_table SET department_name = ?`, new_dept.dept_name); 
    new_dept.getId(dataId[0].insertId);

    console.log(`${new_dept.dept_name} department successfully added`);
    return initialPrompt();
};

module.exports = addDepartment;
const {initialPrompt} = require('../../index.js');