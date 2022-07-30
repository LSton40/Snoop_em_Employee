const db = require('../db/connection');


// function viewDepartments() {

//     db.query('SELECT * FROM department_table', (err, departments) => {
//         if (err) return console.log(err);

//         console.table(departments);
//     })

//     initialPrompt();
// }

// function viewRoles() {

//     db.query('SELECT * FROM employee_role', (err, roles) => {
//         if (err) return console.log(err);

//         console.table(roles);
//     })


//     initialPrompt();
// }

// function viewEmployees() {

//     db.query('SELECT * FROM employee', (err, employees) => {
//         if (err) return console.log(err);

//         console.table(employees);
//     })

    
//     initialPrompt();
// }



class Department {
    constructor(dept_name) {
        this.dept_name = dept_name;
    }

    getId(id) {
        return id;
    }
}


function addDepartment() {
    return inquirer.prompt(addDeptPrompt)

    .then((dInput) => {

        let new_dept = new Department(dInput.add_department);

        db.query('INSERT INTO department_table SET ?', new_dept.dept_name, (err, data) => {
            if (err) return console.log(err);
    
            new_dept.getId(data.id);
            console.log(`${data} department successfully added`);
        })
    })
    .then(() => {
        initialPrompt();
    });
};


















class Role extends Department{
    constructor(role, salary, dept) {
        super(dept);
        this.role = role;
        this.salary = salary;
    }

    getDeptId() {
        return this.dept.id;
    }

    getRoleId(id) {
        return this.id = id;
    }
}

const roleSet = `
    INSERT INTO employee_role
        (title, salary, department_id)
        VALUES (${new_role.role}, ${new_role.salary}, ${new_role.getDeptId()})
    `;

function addRole(addRolePrompt) {
    return inquirer.prompt()

    .then((rInput) => {

        let new_role = new Role(rInput.role, rInput.role_salary, rInput.role_dept);


        db.query(roleSet, (err, data) => {
            if (err) return console.log(err);
    
            new_role.getRoleId(data.insertId);
            console.log(`${new_role.role} job title successfully added`);
            return initialPrompt();
        })
        return;
    })
}


class Employee extends Role{
    constructor(first_name, last_name, role, manager) {
        super(role);
        this.first_name = first_name;
        this.last_name = last_name;
    }

    getRoleId() {
        return this.role.id;
    }

    getManagerId() {

    }
};

class Manager extends Employee{
    super(first_name, last_name, role, manager);
}






function addEmployee() {
    return inquirer.prompt(addEmplPrompt)

    .then((eInput) => {
        
        let new_empl = new Employee(eInput.empl_firstname, eInput.empl_lastname, eInput.empl_role, eInput.empl_manager);

        db.query('INSERT INTO employee SET ?', req.body, (err, data) => {
            if (err) return console.log(err);
    
            res.json({
                id: data.insertId,
                message: '...added successfully'
            });
        })


        return FUNCTION();
    })

    .then(() => {
        initialPrompt();
    })
}




function updateEmployee() {
    return inquirer.prompt(updateEmplPrompt)

    .then(() => {

        db.query('UPDATE employee SET ? WHERE id = ?', [ { Role: role_id }, {id: id}], (err, data) => {
        

            if (err) return console.log(err);
    
            res.json({
                message: '...deleted successfully'
            });
        })

        return FUNCTION();
    })

}