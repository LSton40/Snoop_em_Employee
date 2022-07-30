// const router = require('express').Router();
const db = require('../db/connection');


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
}




    // db.query('SELECT * FROM department_table', (err, data) => {
    //     if (err) return console.log(err);

    //     res.json(data);
    // })



    // db.query('SELECT * FROM employee_role', (err, data) => {
    //     if (err) return console.log(err);

    //     res.json(data);
    // })


    // db.query('SELECT * FROM employee', (err, data) => {
    //     if (err) return console.log(err);

    //     res.json(data);
    // })



    // db.query('INSERT INTO department_table SET ?', req.body, (err, data) => {
    //     if (err) return console.log(err);

    //     res.json({
    //         id: data.insertId,
    //         message: '...added successfully'
    //     });
    // })




    // db.query('INSERT INTO employee_role SET ?', req.body, (err, data) => {
    //     if (err) return console.log(err);

    //     res.json({
    //         id: data.insertId,
    //         message: '...added successfully'
    //     });
    // })




    // db.query('INSERT INTO employee SET ?', req.body, (err, data) => {
    //     if (err) return console.log(err);

    //     res.json({
    //         id: data.insertId,
    //         message: '...added successfully'
    //     });
    // })




    // db.query('DELETE FROM department_table WHERE id = ?', id, (err, data) => {
        

    //     if (err) return console.log(err);

    //     res.json({
    //         message: '...deleted successfully'
    //     });
    // })




    // db.query('DELETE FROM employee_role WHERE id = ?', id, (err, data) => {
       

    //     if (err) return console.log(err);

    //     res.json({
    //         message: '...deleted successfully'
    //     });
    // })


    // db.query('DELETE FROM employee WHERE id = ?', id, (err, data) => {
    //     const id = req.params.id;

    //     if (err) return console.log(err);

    //     res.json({
    //         message: '...deleted successfully'
    //     });
    // })







    // db.query('UPDATE employee SET ? WHERE id = ?', [ { Role: role_id }, {id: id}], (err, data) => {
        

    //     if (err) return console.log(err);

    //     res.json({
    //         message: '...deleted successfully'
    //     });
    // })