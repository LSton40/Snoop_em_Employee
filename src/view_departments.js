const db = require('./db/connection');

const selDept = `SELECT
id AS 'ID',
department_name AS 'Department'
FROM department_table
`;


function viewDepartments() {

db.query(selDept, (err, departments) => {
    if (err) return console.log(err);

    console.table(departments);
    return initialPrompt();
})
}

module.exports = viewDepartments;