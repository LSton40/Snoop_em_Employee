// const router = require('express').Router();
const db = require('../db/connection');




    db.query('SELECT * FROM department_table', (err, data) => {
        if (err) return console.log(err);

        res.json(data);
    })



    db.query('SELECT * FROM employee_role', (err, data) => {
        if (err) return console.log(err);

        res.json(data);
    })


    db.query('SELECT * FROM employee', (err, data) => {
        if (err) return console.log(err);

        res.json(data);
    })



    db.query('INSERT INTO department_table SET ?', req.body, (err, data) => {
        if (err) return console.log(err);

        res.json({
            id: data.insertId,
            message: '...added successfully'
        });
    })




    db.query('INSERT INTO employee_role SET ?', req.body, (err, data) => {
        if (err) return console.log(err);

        res.json({
            id: data.insertId,
            message: '...added successfully'
        });
    })




    db.query('INSERT INTO employee SET ?', req.body, (err, data) => {
        if (err) return console.log(err);

        res.json({
            id: data.insertId,
            message: '...added successfully'
        });
    })




    db.query('DELETE FROM department_table WHERE id = ?', id, (err, data) => {
        

        if (err) return console.log(err);

        res.json({
            message: '...deleted successfully'
        });
    })




    db.query('DELETE FROM employee_role WHERE id = ?', id, (err, data) => {
       

        if (err) return console.log(err);

        res.json({
            message: '...deleted successfully'
        });
    })


    db.query('DELETE FROM employee WHERE id = ?', id, (err, data) => {
        const id = req.params.id;

        if (err) return console.log(err);

        res.json({
            message: '...deleted successfully'
        });
    })







    db.query('UPDATE employee SET ? WHERE id = ?', [ { Role: role_id }, {id: id}], (err, data) => {
        

        if (err) return console.log(err);

        res.json({
            message: '...deleted successfully'
        });
    })