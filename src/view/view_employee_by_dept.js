const db = require('../../db/connection');
const cTable = require('console.table');

//SQL to show all employees within each department
const emplByDept = `
    SELECT 
        d.department_name AS 'Department',
        CONCAT(e.first_name, ' ', e.last_name) AS 'Employee'
        FROM department_table d
            LEFT JOIN employee_role r
                ON r.department_id = d.id
            LEFT JOIN employee e
                ON e.role_id = r.id
        GROUP BY e.id
`;

//Function to view all employees organized by department
async function viewEmplDept() {

    const empls_depts = await db.query(emplByDept);

    console.table(empls_depts[0]);
    return otherPrompt();
};

module.exports = viewEmplDept;
const {otherPrompt} = require('../../index.js');