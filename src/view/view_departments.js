const mysql = require('mysql2/promise');
const db = require('../../db/connection');
const cTable = require('console.table');

//SQL to view all department names and id numbers
const selDept = `
    SELECT
        id AS 'ID',
        department_name AS 'Department'
    FROM department_table
`;

//Function to view all departments
async function viewDepartments() {
    
    const departments = await db.query(selDept);
        
    console.table(departments[0]);
    return initialPrompt();
};

module.exports = viewDepartments;
const {initialPrompt} = require('../../index.js');