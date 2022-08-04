const db = require('../../db/connection');
const cTable = require('console.table');

//SQL to sum and view the employee total salaries within each department
const deptBudg = `
    SELECT
    d.department_name AS 'Department',
    SUM(r.salary) AS 'Utilized Department Budget'
    FROM department_table d
        LEFT JOIN employee_role r
            ON r.department_id = d.id
        LEFT JOIN employee e
            ON e.role_id = r.id
        GROUP BY d.id
    `;

//Function to view department total utilized budgets
async function viewDeptBudget() {
    const budgets = await db.query(deptBudg); 

    console.table(budgets[0]);
    return otherPrompt();
};

module.exports = viewDeptBudget;
const {otherPrompt} = require('../../index.js');