const db = require('./db/connection');

class Department {
    constructor(dept_name) {
        this.dept_name = dept_name;
    }

    getId(id) {
        return this.id = id;
    }
}

function addDepartment() {
    return inquirer.prompt(addDeptPrompt)

    .then((dInput) => {

        let new_dept = new Department(dInput.add_department);
        console.log(new_dept);

        db.query(`INSERT INTO department_table (department_name) VALUES (?)`, new_dept.dept_name, (err, data) => {
            if (err) return console.log(err);
    
            new_dept.getId(data.insertId);

            // console.log(new_dept);
            console.log(`${new_dept.dept_name} department successfully added`);
            return initialPrompt();
        })
        return;
    })
};

module.exports = addDepartment;