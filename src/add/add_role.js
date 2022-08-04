const db = require('../../db/connection');
const inquirer = require('inquirer');
const Role = require('../../classes/Role');

//SQL to add role title, salary, and department id
const roleSet = `
    INSERT INTO employee_role
        SET title = ?, 
        salary = ?, 
        department_id = ?
`;

//Function to add new job role
async function addRole() {

    //Query to view all department names
    const depts = await db.query(`SELECT department_name FROM department_table`);

    let dept_names = depts[0].map(dept => dept.department_name);
    
    //Prompt questions for adding a job role
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
            choices: dept_names
        }
    ];

    const rInput = await inquirer.prompt(addRolePrompt);

    //Defines a new holding object of the Role class
    let new_role = new Role(rInput.role, rInput.role_salary, rInput.role_dept);

    //Query to get id number of selected department
    const dept_num = await db.query(`SELECT id FROM department_table WHERE department_name = ?`, new_role.dept_name);
    
    //Query to add the new role information
    const fin_data = await db.query(roleSet, [new_role.role, new_role.salary, dept_num[0][0].id]);
    new_role.getRoleId(fin_data.insertId);

    console.log(`${new_role.role} job title successfully added`);
    return initialPrompt();
};

module.exports = addRole;
const {initialPrompt} = require('../../index.js');