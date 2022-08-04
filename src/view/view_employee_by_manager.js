const db = require('../../db/connection');
const cTable = require('console.table');

//SQL to show all employee names organized by manager names
const emplByMgr = `
SELECT 
    CONCAT(m.first_name, ' ', m.last_name) AS 'Manager',
    CONCAT(e.first_name, ' ', e.last_name) AS 'Employee'
    FROM employee m
        LEFT JOIN employee e
            ON e.manager_id = m.id
        GROUP BY e.id
    `;

//Function to view all manager-employee associations
async function viewEmplMgr() {

    const empls_mgrs = await db.query(emplByMgr);

    console.table(empls_mgrs[0]);
    return otherPrompt();
};

module.exports = viewEmplMgr;
const {otherPrompt} = require('../../index.js');