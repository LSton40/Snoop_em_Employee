const db = require('../db/connection');
const cTable = require('console.table');

const selRole = `SELECT
    employee_role.id AS 'ID',
    employee_role.title AS 'Job Title',
    employee_role.salary AS 'Salary',
    department_table.department_name AS 'Department'
    FROM employee_role
        LEFT JOIN department_table
        ON employee_role.department_id = department_table.id
`;

function viewRoles() {

    db.query(selRole, (err, roles) => {
        if (err) return console.log(err);

        console.table(roles);
        return initialPrompt();
    })
}


module.exports = viewRoles;