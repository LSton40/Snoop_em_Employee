const db = require('../../db/connection');
const cTable = require('console.table');

//SQL to view all job role titles, base salaries, department, and role id number
const selRole = `
    SELECT
        employee_role.id AS 'ID',
        employee_role.title AS 'Job Title',
        employee_role.salary AS 'Salary',
        department_table.department_name AS 'Department'
    FROM employee_role
        LEFT JOIN department_table
            ON employee_role.department_id = department_table.id
`;

//Function to view all roles
async function viewRoles() {

    const roles = await db.query(selRole); 

    console.table(roles[0]);
    return initialPrompt();
};

module.exports = viewRoles;
const {initialPrompt} = require('../../index.js');