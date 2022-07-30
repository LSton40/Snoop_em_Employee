const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    database: 'employee_roster',
    user: 'root',
    password: 'Ptawute_iwaseko%sh13'
})

module.exports = connection;