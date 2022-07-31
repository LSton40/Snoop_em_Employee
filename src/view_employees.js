const db = require('../db/connection');
const cTable = require('console.table');

const empls = `SELECT
    e.id AS 'ID',
    e.first_name AS 'First Name',
    e.last_name AS 'Last Name',
    employee_role.title AS 'Job Title',
    CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    FROM employee AS e
        LEFT JOIN employee AS m 
            ON m.id = e.manager_id
        LEFT JOIN employee_role
            ON employee_role.id = e.role_id
`;

function viewEmployees() {

    db.query(empls, (err, employees) => {
        if (err) return console.log(err);

        console.table(employees);
        return initialPrompt();
    })
};

module.exports = viewEmployees;