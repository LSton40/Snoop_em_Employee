const db = require('../../db/connection');
const cTable = require('console.table');

//SQL to view all employee names, roles (job titles), managers, and id numbers
const empls = `
    SELECT
        e.id AS 'ID',
        e.first_name AS 'First Name',
        e.last_name AS 'Last Name',
        employee_role.title AS 'Job Title',
        CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    FROM employee e
        LEFT JOIN employee m 
            ON m.id = e.manager_id
        LEFT JOIN employee_role
            ON employee_role.id = e.role_id
`;

//Function to view all employees
async function viewEmployees() {

    const employees = await db.query(empls);

    console.table(employees[0]);
    return initialPrompt();
};

module.exports = viewEmployees;
const {initialPrompt} = require('../../index.js');